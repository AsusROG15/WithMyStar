package org.withmystar.shell.app;

import android.content.Context;
import com.google.mediapipe.tasks.genai.llminference.LlmInference;
import com.google.mediapipe.tasks.genai.llminference.LlmInference.LlmInferenceOptions;

public class OracleService {

    private LlmInference llmInference;

    public OracleService(Context context, String modelPath) {
        LlmInferenceOptions options = LlmInferenceOptions.builder()
                .setModelPath(modelPath)
                .build();

        llmInference = LlmInference.createFromOptions(context, options);
    }

    public String generateResponse(String prompt) {
        return llmInference.generateResponse(prompt);
    }
}