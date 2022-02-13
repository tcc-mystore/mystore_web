
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    // Início da estilização da barra de ferramentas
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    // Fim da estilização da barra de ferramentas
    // início da estilização da menu esquerdo
    alinhamentoExtremo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px',
    },
    alinhamentoInicio: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '-5px',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    // Fim da estilização da menu esquerdo
    //Início da estilização do Container
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    //Fim da estilização do Container
    //Início Grid
    rootGrid: {
        flexGrow: 1,
    },
    paperGrid: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    //Fim Grid
    //Início formulário
    rootForm: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    //Fim formulário
    //Início Tabela
    rootTabela: {
        width: '100%',
    },
    containerTabela: {
        display: 'flex',
        width: '100%',
        maxHeight: 440,
        marginTop: '10px',
    },
    //Fim Tabela
}));