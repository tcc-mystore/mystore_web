import React from 'react';
import { Chart } from "react-google-charts";
import Carregando from '../Carregando';

const LineChart = (props) => {

    return (
        <>
            {
                props.dados ?
                    <Chart
                        chartType={props.tipo}
                        loader={<Carregando />}
                        data={props.dados}
                        options={{
                            title: props.titulo,
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: props.dados[0][1],
                                minValue: 0,
                            },
                            vAxis: {
                                title: props.dados[0][0],
                            },
                                                    }}
                        //      For tests
                        rootProps={{ 'data-testid': '1' }} />
                    :
                    JSON.stringify(props.dados)}
        </>
    )
}

export default LineChart;