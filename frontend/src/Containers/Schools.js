import School_grid from '../Components/SchoolGrid'

let user = 'Tom'
const schools_data = [
    {
      id: 1,
      name: "University of California, Berkeley",
      date: "3/28",
    },
    {
      id: 2,
      name: "Rice University",
      date: "5/10",
    },
    {
      id: 3,
      name: "Duke University",
      date: "3/20",
    },
    {
      id: 4,
      name: "Carnigie Mellon University",
      date: "4/4",
    }
  ];

  let all_schools = [] 
  for (let i = 0; i < schools_data.length; i++){
      all_schools.push(<School_grid
                            key = {i}
                            name = {schools_data[i].name}
                            date = {schools_data[i].date}
                            rate = {i+1}
                        />)
  }


const Schools = ({schools_data}) => {
    return (
        <div>
            <h1>{user}'s List of Candidate Schools</h1>
            <div>
                {all_schools}
            </div>
        </div>
    )
}

export default Schools