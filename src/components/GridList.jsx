import CardGrid from "./CardGrid";

const GridList = ({caption, Data , cat}) => {
  return (
    <div>
      <h2 className="ml-5 gg:text-[32px] text-2xl font-bold text-text-primary mb-4">
        {caption}
      </h2>
      <div className="grid mt-0 min-[600px]:mx-5 mx-2 min-[1070px]:grid-cols-4 gg:grid-cols-3 min-[700px]:grid-cols-4 grid-cols-3">
        {Data && Data.map((data, index) => (
          data.poster_path && data.backdrop_path && (
            <div key={index}><CardGrid data={data} cat={cat} /></div>
          )
        ))}
      </div>
    </div>
  )
}

export default GridList