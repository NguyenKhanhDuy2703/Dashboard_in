const  Pagination = () => {
return (
    
      <div className="mt-4 flex justify-end items-center gap-2">
        <button className="px-3 py-1 border rounded">1</button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">3</button>
        <button className="px-3 py-1 border rounded">4</button>
        <button className="px-3 py-1 border rounded">5</button>
        <button className="px-3 py-1 border rounded">{`>>`}</button>
      </div>
)
}
export default Pagination;