const path = require("path");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const OfflinePlugin = require("offline-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

let config = {
  entry: {
    main: ["./src/index"]
  },
  resolve: {
    modules: ["src", "files", "node_modules"]
  },
  output: {
    path: path.resolve("public"),
    publicPath: "/",
    filename: "[name]-[chunkhash].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || ""),
        SITE_URL: JSON.stringify(process.env.SITE_URL || ""),
        DEFAULT_CREDITS: JSON.stringify(process.env.DEFAULT_CREDITS || ""),
        GOOGLE_ANALYTICS: JSON.stringify(process.env.GOOGLE_ANALYTICS || ""),
        LAUNCH_DATE: JSON.stringify(process.env.LAUNCH_DATE || "")
      },
      __REACT_DEVTOOLS_GLOBAL_HOOK__: ({ isDisabled: true })
    }),
    new CopyPlugin([{
      context: 'src/',
      from: 'CNAME',
      to: ''
    },{
      context: 'src/',
      from: '404.html',
      to: ''
    }
  ])
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["env", "react"],
          plugins: [
            "transform-object-rest-spread",
            "syntax-class-properties",
            "transform-class-properties"
          ]
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg|gif|svg|woff2|woff|eot|ttf|mp4|pdf)$/,
        loader: "file-loader",
        options: {
          name(file) {
            if (file.indexOf("/documents/") !== -1) {
              return "[name]-[hash].[ext]";
            } else {
              return "[hash].[ext]";
            }
          }
        }
      },
      {
        test: /\.(md|txt)$/,
        use: [
          {
            loader: "raw-loader"
          }
        ]
      }
    ]
  }
};

const favicons = new FaviconsWebpackPlugin({
  logo: path.resolve("src/images", "logo.png")
});

const pwa = new WebpackPwaManifest({
  name: "O Mata Cavalo",
  short_name: "O Mata Cavalo",
  description:
    "Reportagem 'A luta dos herdeiros de Mata Cavalo pelo título do quilombo' publicada em hotsite feito em React e produzida pela Amazônia Real com desenvolvimento do InfoAmazoniaThe destruction of 110 thousand square kilometers of forests in the largest mining project in Venezuela",
  background_color: "#fff",
  orientation: "portrait",
  start_url: "/?launcher=true",
  icons: [
    {
      src: path.resolve("src/images", "logo.png"),
      sizes: [48, 96, 192, 256, 512]
    }
  ]
});

const html = new HTMLWebpackPlugin({
  template: path.resolve("src", "index.html"),
  filename: "index.html",
  inject: "body"
});

const html404 = new HTMLWebpackPlugin({
  template: path.resolve("src", "index.html"),
  filename: "404.html",
  inject: "body"
});

const offline = new OfflinePlugin({
  ServiceWorker: {
    events: true
  },
  caches: {
    main: [
      "index.html",
      "*.js",
      "*.css",
      "*.svg",
      "*.ttf",
      "*.woff",
      "*.woff2"
    ],
    additional: [":externals:", "*.jpg", "*.png"],
    optional: ":rest:"
  },
  cacheMaps: [
    {
      match: url => {
        const extension = url.pathname.split(".").pop();
        // Different origin
        if (url.origin !== location.origin) return;
        // PDF files
        if (extension == "pdf") return;
        return new URL("/", location);
      },
      requestTypes: ["navigate", "same-origin"]
    }
  ]
});

if (process.env.NODE_ENV == "production") {
  config.plugins = config.plugins.concat([favicons, pwa, html, offline]);
} else {
  config.plugins = config.plugins.concat([html, html404]);
}

module.exports = config;
