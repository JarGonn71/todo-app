import Head from 'next/head'


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
