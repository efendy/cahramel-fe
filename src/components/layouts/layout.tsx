import Meta from '@components/meta'

const Layout = ({ children }: any) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
};

export default Layout;
