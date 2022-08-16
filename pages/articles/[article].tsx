import { useRouter } from 'next/router'
import Error from 'next/error'

export async function getServerSideProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const errorCode = res.status
    const json = await res.json()

    return {
        props: { errorCode, stars: json.stargazers_count },
    }
}

export default function ArticlePage({ errorCode, stars }: { errorCode: number, stars: any }) {
    const router = useRouter()
    const { article } = router.query

    if (errorCode !== 200) {
        return <Error statusCode={errorCode} />
    }

    return (
        <div>{article} {stars}</div>
    )
}
