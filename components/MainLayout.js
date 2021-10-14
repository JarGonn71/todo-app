import Head from 'next/head'

//wrapper для всех страниц
function MainLayout({children, titlePage = "Todo"}) {
    return (
        <>
            <Head>
                <title>{titlePage}</title>
            </Head>
            <div className="Navbar">
                <span>Next JS | Todo</span>
            </div>
            <main>
                {children}
            </main>
        </>
    )
}

export default MainLayout
