import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import QUERY_CLIENT_CONFIG from './config/query.config'
import Router from './common/Router'
import { AuthProvider } from './context/AuthContext'
import { LoadingProvider } from './context/LoaderContext'

const App = () => {
    return (
        <QueryClientProvider client={QUERY_CLIENT_CONFIG}>
            <LoadingProvider>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </LoadingProvider>
        </QueryClientProvider>
    )
}

export default App
