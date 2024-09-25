interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return ( 
        <div className="max-w-[1440px] mx-auto xl:px-20 lg:px-8 px-4">
            {children}
        </div>
     );
}
 
export default Container;