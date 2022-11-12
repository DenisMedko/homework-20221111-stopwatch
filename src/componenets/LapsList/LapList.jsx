import Lap from './Lap';

const LapList = (props) => {
    //debugger;
    const {laps} = props;
    const lapsElements = laps.map(lap => (<Lap key={lap.id} lap={lap}/>));
    return (
        <ul>
            {lapsElements}    
        </ul>
    );
}

export default LapList;
