use tonic::{transport::Server, Request, Response, Status};
use log::{info, debug};
use std::sync::atomic::{AtomicUsize, Ordering};

pub mod ritual {
    tonic::include_proto!("ritual");
}

use ritual::{
    ritual_service_server::{RitualService, RitualServiceServer},
    RitualRequest, RitualResponse,
    SyncTraitsRequest,
};

#[derive(Default)]
pub struct MyRitualService {
    ritual_count: AtomicUsize,
}

#[tonic::async_trait]
impl RitualService for MyRitualService {
    async fn perform_ritual(
        &self,
        request: Request<RitualRequest>,
    ) -> Result<Response<RitualResponse>, Status> {
        let req = request.into_inner();
        info!("Received ritual request: {:?}", req);

        let current_count = self.ritual_count.fetch_add(1, Ordering::SeqCst) + 1;
        if current_count % 5 == 0 {
            info!("Milestone Reached: {} rituals performed!", current_count);
        }

        let reply = RitualResponse {
            success: true,
            message: format!("Successfully performed ritual: {}.", req.name),
        };
        debug!("Sending ritual response: {:?}", reply);

        Ok(Response::new(reply))
    }

    async fn sync_traits(
        &self,
        request: Request<SyncTraitsRequest>,
    ) -> Result<Response<RitualResponse>, Status> {
        let req = request.into_inner();
        info!("Received trait synchronization request: {:?}", req);

        let reply = RitualResponse {
            success: true,
            message: "Successfully synchronized traits.".to_string(),
        };
        debug!("Sending trait synchronization response: {:?}", reply);

        Ok(Response::new(reply))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    env_logger::init();

    let addr = "[::1]:50051".parse()?;
    let ritual_service = MyRitualService::default();

    info!("RitualService listening on {}", addr);

    Server::builder()
        .add_service(RitualServiceServer::new(ritual_service))
        .serve(addr)
        .await?;

    Ok(())
}
