const MonthlyEventItem = ({ title, cp }) => {
    return (
        <li className="py-2">
            <div className="flex text-sm flex-1 justify-between">
                <h3 className="font-medium" style={{color: cp ? "grey" : "blue"}}>{title}</h3>
            </div>
        </li>
    )
}

export default MonthlyEventItem;