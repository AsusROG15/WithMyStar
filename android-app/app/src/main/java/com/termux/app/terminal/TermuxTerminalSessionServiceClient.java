package org.withmystar.shell.app.terminal;

import android.app.Service;

import androidx.annotation.NonNull;

import org.withmystar.shell.app.TermuxService;
import org.withmystar.shell.shared.termux.shell.command.runner.terminal.TermuxSession;
import org.withmystar.shell.shared.termux.terminal.TermuxTerminalSessionClientBase;
import org.withmystar.shell.terminal.TerminalSession;
import org.withmystar.shell.terminal.TerminalSessionClient;

/** The {@link TerminalSessionClient} implementation that may require a {@link Service} for its interface methods. */
public class TermuxTerminalSessionServiceClient extends TermuxTerminalSessionClientBase {

    private static final String LOG_TAG = "TermuxTerminalSessionServiceClient";

    private final TermuxService mService;

    public TermuxTerminalSessionServiceClient(TermuxService service) {
        this.mService = service;
    }

    @Override
    public void setTerminalShellPid(@NonNull TerminalSession terminalSession, int pid) {
        TermuxSession termuxSession = mService.getTermuxSessionForTerminalSession(terminalSession);
        if (termuxSession != null)
            termuxSession.getExecutionCommand().mPid = pid;
    }

}
