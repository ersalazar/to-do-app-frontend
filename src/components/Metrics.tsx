import { MetricsProps } from "@/utils/types";
import React from "react";


export default function Metrics({
    avgTimeToFinishTasks,
    avgTimeToFinishTasksPriorityHigh,
    avgTimeToFinishTasksPriorityMedium,
    avgTimeToFinishTasksPriorityLow
}: MetricsProps) {

    return (
        <div className=" w-full flex flex-row border-solid border-black shadow-md shadow-black rounded-md">
            <div className="w-1/2 p-5 flex flex-col justify-center items-center">

                <span>
                    Avarage time to finish tasks:
                </span>
                <span>
                    {avgTimeToFinishTasks} minutes
                </span>
            </div>
            <div className="w-1/2 p-5 flex flex-col justify-center items-center">
                <span>Average time to finish task by priority: </span>
                <span>Low: {avgTimeToFinishTasksPriorityLow} minutes</span>
                <span>Medium: {avgTimeToFinishTasksPriorityMedium} minutes</span>
                <span>High: {avgTimeToFinishTasksPriorityHigh} minutes</span>
            </div>

        </div>
    )
}