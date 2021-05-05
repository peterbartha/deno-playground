# Deno Playground — An unofficial land for exploring 

The playground lets you write TypeScript (or JavaScript) online in a safe and shareable way.


<p align="center"><br><img width="1216" alt="image" src="https://user-images.githubusercontent.com/7854312/117201415-ec1ad280-adec-11eb-8af6-dad209a6010c.gif"><br><br></p>

## What is Deno? Why should you use that?

Deno is a simple, modern, and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

- Secure by default. No file, network, or environment access, unless explicitly enabled.
- Supports TypeScript out of the box.
- Ships only a single executable file.
- Has built-in utilities like a dependency inspector (`deno info`) and a code formatter (`deno fmt`).
- Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: [deno.land/std](https://deno.land/std)

Learn more on **[Deno's public site](https://deno.land/)**.


## Project structure

There are two packages inside the project:
- Serverless Deno back-end (built on [vercel-deno](https://github.com/TooTallNate/vercel-deno))
- [Next.js](https://nextjs.org/) front-end


```
.

└─ 📂 packages
   ├─ 📦 functions
   └─ 📦 ui
```

## Build

You can get this site up and running on your local dev environment with these five steps:

1. **Install the Vercel CLI**

   ```shell
   npm i -g vercel
   ```

2. **Clone this repository from GitHub**

   Clone [deno-playground](https://github.com/peterbartha/deno-playground) project from GitHub with the following command:

   ```shell
   git clone git@github.com:peterbartha/deno-playground.git
   ```

3. **Install yarn dependencies**

   Next, move into `deno-playground` directory and start it up:

   ```shell
   cd deno-playground/

   yarn
   ```

4. **Start dev server**

   ```shell
   # start Vercel in dev mode
   vercel dev

   # Set up and develop “.../deno-playground”? [Y/n]
   Y

   # Which scope should contain your project?
   <Your name>

   # Found project “<your_nickname>/deno-playground”. Link to it? [Y/n]
   N

   # Link to different existing project? [Y/n]
   Y

   # What’s the name of your existing project?
   deno-playground-api

   # 🔗 Linked to peterbartha/deno-playground-api (created .vercel)

   # Ready! Available at http://localhost:3000
   ```

5. **Setup HTTPS on local development server**

   [mkcert](https://github.com/FiloSottile/mkcert) is the recommended option here which is simpler than the alternatives.
   mkcert will create a CA and SSL Certificate for the server for you.

   - Install [mkcert](https://github.com/FiloSottile/mkcert#installation).
   - `mkcert -install` will generate a CA first.
   - Generate a certificate for localhost with `mkcert localhost`.
   - This will generate a certificate and a key named as `*.pem` and `*-key.pem` respectively.
   - **Copy generated `*.pem` files to the `packages/ui/scripts/` folder.**

6. **Start the site in `dev` mode**

   ```shell
   # use a different shell
   cd packages/ui

   yarn run dev
   ```

## Deploy on Vercel

The easiest way to deploy this project is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Unfortunately, to connect multiple Vercel projects with the same Git repository, you need to create a new project for each of the packages within this Git repository.

[Learn more](https://vercel.com/blog/monorepos#creating-projects-from-a-monorepo)

## Credits

This project uses the following open-source packages:

- [Vercel](https://github.com/vercel/vercel)
- [Deno](https://github.com/denoland/deno)
- [Next.js](https://github.com/vercel/next.js)
- [vercel-deno](https://github.com/TooTallNate/vercel-deno)
- [mkcert](https://github.com/FiloSottile/mkcert)


## Configuration

There are a few [build environment
variables](https://vercel.com/docs/configuration#project/build-env) that you
may configure for your serverless functions:

| Name            | Description                                                                                                                                                                              | Default |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `SCRIPT_EXECUTION_TIMEOUT`         | Time-based execution limit for the build-time in ms.                                                                                                                                | 10000 |
| `DEBUG`         | Enables additional logging during build-time.                                                                                                                                            | `false` |
| `DENO_TSCONFIG` | Passes the [`--config`](https://deno.land/manual/getting_started/command_line_interface#cache-and-compilation-flags) flag to specify a `tsconfig.json` file that Deno will use.          | None    |
| `DENO_UNSTABLE` | Passes the [`--unstable`](https://deno.land/manual/getting_started/command_line_interface#cache-and-compilation-flags) flag to `deno cache` (at build-time) and `deno run` (at runtime). | `false` |
| `DENO_VERSION`  | Version of `deno` that the serverless function will use.                                                                                                                                 | `1.9.2` |

## Contributing

If you have any ideas, just [open an issue](https://github.com/peterbartha/deno-playground/issues) and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as
you'd like. Pull requests are warmly welcome.


## License

This project is licensed under [MIT](LICENSE) license.
