import { Filters, SearchAndFiltersControlsProps } from "@/utils/types"
import React from "react"


export default function SearchAndFilterControls( props : SearchAndFiltersControlsProps) {

    const {handleSearch} = props

    const handleSearchClick = () => {
        const name = ((document.getElementById("todoText") as HTMLInputElement).value).trim()
        const priority = ((document.getElementById("selectPriority") as HTMLInputElement).value).trim() as 'High' | 'Medium' | 'Low' | 'All'
        const state = ((document.getElementById("selectState") as HTMLInputElement).value).trim() as 'Done' | "Undone" | 'All'

        const props: Filters = {
        
            text: name,
            priority,
            done: state === "All" ? null : state === "Done" 
        }


        handleSearch(props)
    }
    
    return(
        <div className="flex flex-col w-full h-fit justify-start items-start gap-1 border-solid border-black p-2">

            <div className="w-full  flex-1  flex flex-row  ">
                <label className="ml-1 w-20" htmlFor="todoText">Name</label>
                <input className="ml-2 w-full border border-black rounded-md" type="text" id="todoText" />

            </div>
            <div className=" w-full flex-1 00  flex flex-row ">
                <div className="w-1/2 flex-row justify-start items-start h-fit 500 flex-1">

                    <div className="w-full  flex-1  flex flex-row my-1 ">
                        <label className="ml-2 w-20  " htmlFor="selectPriority">Priority</label>
                        <select className="ml-2 w-full  border border-black rounded-md"  id="selectPriority" >
                            <option value="All">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="w-full  flex-1  flex flex-row my-2 ">
                        <label className="ml-2 w-20 " htmlFor="selectState">State</label>
                        <select className="ml-2 w-full  rounded-md border border-black"  id="selectState" >
                            <option value="All">All</option>
                            <option value="Done">Done</option>
                            <option value="Undone">Undone</option>
                        </select>
                    </div>
                </div>
                <div className="w-1/2 justify-center flex items-center flex-1 -500">
                    <button className="w-1/3 h-2/3 rounded-md bg-gray-300 " onClick={handleSearchClick}>
                        Search
                    </button>

                </div>
            </div>
        </div>
    )
    
}