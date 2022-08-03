import Head from "next/head";

export default function RPCHead({ title }: { title: string }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Reformation Presbyterian Church of Atlanta - A Congregation of the Free Church of Scotland (Continuing)" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
    )
}
