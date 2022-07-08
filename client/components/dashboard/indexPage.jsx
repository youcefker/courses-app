const IndexPage = ({children})=>{
    return (
        <>
        <div className="hidden lg:block px-6 py-8 h-[100vh] bg-[#F5F5F5]" style={{
            paddingLeft:"270px"
        }} >
            {children}
        </div>
        <div className=" lg:hidden px-6 py-8 h-[100%] bg-[#F5F5F5]" >
            {children}
        </div>
        </>
    );
}
export default IndexPage;