import React, {forwardRef} from 'react';
import {flushSync} from 'react-dom';
import {createRoot, Root} from 'react-dom/client';
import {UserInterfaceComponent} from './UserInterfaceComponent';
import {WagmiProvider} from 'wagmi';
import cryptoConfig from './configuration/config';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PopupProvider} from './core/providers/PopupProvider';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const UserInterfaceReference = forwardRef(UserInterfaceComponent);

const theme = createTheme();

export class UserInterface {
    private root: Root;

    private wrapper = document.createElement('div');

    constructor(
        private holderElement: HTMLElement,
        private clientname: string
    ) {
        this.holderElement.appendChild(this.wrapper);
        this.root = createRoot(this.wrapper);
    }

    init() {
        const queryClient = new QueryClient();

        flushSync(() =>
            this.root.render(
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <PopupProvider>
                        <WagmiProvider config={cryptoConfig}>
                            <QueryClientProvider client={queryClient}>
                                <UserInterfaceReference ref={this.appRef}/>
                            </QueryClientProvider>
                        </WagmiProvider>
                    </PopupProvider>
                </ThemeProvider>
            )
        );
    }
}
