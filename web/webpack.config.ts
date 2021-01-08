import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const mode = process.env.NODE_ENV === 'dev' ? 'development' : 'production';

const config: webpack.Configuration = {
    mode,
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].bundle.js',
        publicPath: './',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                },
                            ],
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            ['babel-plugin-import', { libraryName: 'antd' }],
                            '@babel/plugin-proposal-class-properties',
                        ],
                    },
                },
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.ejs'),
        }),
        new webpack.ProvidePlugin({ React: 'react' }),
        new webpack.HotModuleReplacementPlugin(),
        ...(process.env.NODE_ENV === 'analyzer'
            ? [new BundleAnalyzerPlugin()]
            : []),
    ],
    devServer: {
        open: true,
        port: 9000,
        historyApiFallback: true,
        publicPath: '/',
    },
};

export default config;
