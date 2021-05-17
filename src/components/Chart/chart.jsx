import { PieChart } from 'react-minimal-pie-chart';

const Chart = (props) => {

    let completedTasks = props.completed/props.total * 100,
        pendingdTasks = 100 - completedTasks;

    return (
        <PieChart
        data={[
            { title: 'Completed Tasks', value: completedTasks, color: '#5285ec' },
            { title: 'Pending Tasks', value: pendingdTasks, color: '#e8ecec' }
        ]}
        />
    );
};

export default Chart;