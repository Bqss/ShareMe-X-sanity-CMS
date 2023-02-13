
import  Masonry from "react-masonry-css";

const breakpoints = {
  4000 : 7,
  2648: 6,
  1920: 5,
  1440: 3,
  1080:2,
  500:1

}

interface MasonryLayoutProps {
  children : React.ReactElement[]
}

const MasonryLayout = ({children }: MasonryLayoutProps) => {

  return (
    <Masonry breakpointCols={breakpoints} className="flex gap-4">
      {children}
    </Masonry>
  )
}

export default MasonryLayout