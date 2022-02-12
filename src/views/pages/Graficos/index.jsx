import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LineChart from '../../components/LineChart';
import { connect, useSelector } from 'react-redux';
import * as actionsSpc from '../../../domain/actions/actionsSpc';
import { Button, FormControlLabel } from '@material-ui/core';
//import CampoNumero from '../../components/CampoNumero';
//import CampoData from '../../components/CampoData';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Graficos = (props) => {
    const classes = useStyles();
    // const [numeroCGC, setNumeroCGC] = useState(33200056);
    // const [periodoFaturamentoInicio, setPeriodoFaturamentoInicio] = useState(41121);
    // const [periodoFaturamentoFim, setPeriodoFaturamentoFim] = useState(41121);
    // const [dataAgendaInicio, setDataAgendaInicio] = useState(null);
    // const [dataAgendaFim, setDataAgendaFim] = useState(null);

    const { spc } = useSelector((state) => state);

    const [data, setData] = useState([]);

    const [tipo, setTipo] = React.useState('');

    const tipos = [
        { id: 1, nome: 'Area Chart' },
        { id: 2, nome: 'Bar Chart' }
    ];

    const handleChange = (event) => {
        setTipo(event.target.value);
    };

    const carteiraClientesFiltro = {
        numeroCGC: 33200056,
        periodoFaturamentoInicio: 41121,
        periodoFaturamentoFim: 41121,
        dataAgendaInicio: '2000-07-07',
        dataAgendaFim: '2021-07-07'
    };

    const preeencherDadosGrafico = async () => {
        await props.carteiraClienteTeste(carteiraClientesFiltro);
        var dadosGrafico = [['CGC', 'Saldo', 'Período'], [0, 0, 0]];
        if (spc.carteiraClientes) {
            setData(dadosGrafico.concat(spc.carteiraClientes))
        } else {
            setData(dadosGrafico.concat([[0, 0, 0]]))
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => {
                            preeencherDadosGrafico();
                        }}>Teste</Button>
                        <FormControl required className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Tipo de Gráfico</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={tipo}
                                onChange={handleChange}>
                                <MenuItem value="">
                                    <em>Vazio</em>
                                </MenuItem>
                                {tipos.map((grafico) => {
                                    return <MenuItem value={grafico.id}>{grafico.nome}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {/*
                        <CampoNumero titulo="CGC" valor={numeroCGC} alterarTexto={(value) => setNumeroCGC(value)} />
                        <CampoNumero titulo="PERFAT Início" valor={periodoFaturamentoInicio} alterarTexto={(value) => setPeriodoFaturamentoInicio(value)} />
                        <CampoNumero titulo="PERFAT Fim" valor={periodoFaturamentoFim} alterarTexto={(value) => setPeriodoFaturamentoFim(value)} />
                        <CampoData titulo="Agenda Início" valor={dataAgendaInicio} alterarTexto={(value) => setDataAgendaInicio(value)} />
                        <CampoData titulo="Agenda Fim" valor={dataAgendaFim} alterarTexto={(value) => setDataAgendaFim(value)} />
                    */}
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {data.length > 2 && <LineChart tipo='ColumnChart' titulo='Carteira de Cliente Por Perído' dados={data} />}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default connect(null, actionsSpc)(Graficos);