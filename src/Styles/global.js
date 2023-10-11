import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.textColor};
    transition: all 0.3s linear;
}

.canvas{
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-auto-flow: row;
    grid-tamplate-row: auto 1fr auto;
    gap: 0.5rem;
    padding-block: 2rem;
    align-items: space-between;
    text-align: center;
    position: relative;
}
.typing-area{
    // border: 1px solid white;
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
}
.type-box{
    // border: 1px solid white;
    max-width: 1200px;
    heigh: 140px;
    margin-inline: auto;
    overflow: hidden;
}
.words{
    font-size: 24px;
    display: flex;
    flex-wrap: wrap;
    color: ${({theme}) => theme.typeBoxColor};
}
.word{
    // border: 1px solid white;
    margin: 5px;
    padding-right: 2px;
}
.hidden-input{
    // border: 1px solid white;
    opacity: 0;
}
.current{
    border-left: 2px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;

    @keyframes blinking{
        0%{border-left-color: ${({theme}) => theme.curserColor};}
        25%{border-left-color: transparent;}
        50%{border-left-color: ${({theme}) => theme.curserColor};}
        75%{border-left-color: transparent;}
        100%{border-left-color: ${({theme}) => theme.curserColor};}
    }
}
.current-right{
    border-right: 2px solid;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;

    @keyframes blinkingRight{
        0%{border-right-color: ${({theme}) => theme.curserColor};}
        25%{border-right-color: transparent;}
        50%{border-right-color: ${({theme}) => theme.curserColor};}
        75%{border-right-color: transparent;}
        100%{border-right-color: ${({theme}) => theme.curserColor};}
    }
}
.correct{
    color: ${({theme}) => theme.correctText};
}
.incorrect{
    color: ${({theme}) => theme.wrongText};
}
.upperMenu{
    // border: 1px solid white;
    max-width: 1200px;
    margin: 10px auto;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.25rem;
}
.counter{
    color: ${({theme}) => theme.timerColor};
    font-weight: bold;
}
.modes{
    // border: 1px solid white;
    display: flex;
    align-items: center;
    text-align: center;
    gap: 1rem;
    font-weight: bold;
}
.time-mode, .upperMenu-reset-btn{
    // border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.upperMenu-reset-btn{
    margin-top: 5px;
}
.time-mode:hover{
    color: ${({theme}) => theme.timerColor};
}
.selected-time{
    color: ${({theme}) => theme.timerColor};
}

.stats-box{
    // border: 1px solid white;
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    margin-inline: auto;
}
.left-stats{
    // border: 1px solid black;
    width: 20%;
}

.right-stats{
    // border: 1px solid white;
    width: 80%
}
.title{
    font-size: 20px;
    font-weight: bold;
}
.subtitle{
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}) => theme.timerColor}
}
.restart-btn{
    margin-block: 10px;
    font-size: 20px;
}

// starting header styling

.header{
    // border: 1px solid white;
    width: 100%;
    max-width: 1200px;
    height: 80px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    color: ${({theme}) => theme.timerColor}
}
.logo-container{
    font-size: 40px;
    display: flex;
    align-items: center;
}
.finger{
    margin-left: 10px;
}
.logo-container span img{
    width: 50px;
    margin-top: 18px;
    margin-right: 5px;
}
.finger span, .fat span{
    dispaly: flex;
    align-items: center;
    justify-content: center;
}
.userContainer{
    display: flex;
    align-items: center;
}
.user-icon{
    font-size: 28px;
}
.userFormContainer{
    position: relative;
    width: 400px;
    text-align: center;
    background: white;
    outline: none;
}
.loading-of-screen{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.userInfo-component{
    width: 100%;
    max-width: 1200px;
    height: 250px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    padding: 50px;
    background: ${({theme}) => theme.textColor};
    border-radius: 20px;
}
.userInfoContainer{
    border-right: 2px solid ${({theme}) => theme.timerColor};
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 30px;
    color: ${({theme}) => theme.timerColor};
}
.user-photo{
    // border: 1px solid white;
    height: 100%
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
}
.user-Info{
    // border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 1rem;
    font-size: 1.5rem;
    margin-left: 50px;
}
.total-tests{
    // border: 1px solid white;
    width: 50%;
    font-size: 3rem;
    color: ${({theme}) => theme.timerColor};
}
.graph-container, .table-container{
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    margin-block: 20px;
}

// footer styling..
.footer{
    // border: 1px solid white;
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-inline: auto; 
}
.links{
    display: flex;
    align-items: center;
    gap: 10px;

}
.links div a{
    text-decoration: none;
    color: ${({theme}) => theme.textColor};
}



`