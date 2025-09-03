import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

//предохранитель
//предохранители ловят не все ошибки 
//они ловят - ОШИБКИ ПРИ ЗАПУСКЕ МЕТОДА РЕНДЕР, МЕТОДАХ ЖИЗНЕННОГО ЦИКЛА И КОНСТРУКТОРАХ ДОЧЕРНИХ КОМПОНЕНТАХ
//они НЕ ловят - 1 ОШИБКИ ВНУТРИ ОБРАБОТЧИКАХ СОБЫТИЙ (так как жто событие происходит вне метода рендер и предохранитель 
// не знает когда отслеживать данное событие так как оно может произойти в любой момент времени);
//2 АСИНХРОННЫЙ КОД (те же причины, мы не знаем когда эта операция закончиться); 3 ОШИБКИ В САМОМ ПРЕДОХРАНИТЕЛЕ
//4 СЕРВЕРНЫЙ РЕНДЕРИНГ
//В ИДЕАЛЕ НЕЛЬЗЯ ДОПУСКАТЬ СРАБАТЫВАНИЕ ПРЕДОХРАНИТЕЛЯ 
//
class ErrorBoundary extends Component{
    state = {
        error: false
    }

    /* static getDerivedStateFromError(error){
        return {error: true}//обновляет только стейт в предохранителе, по факту жто setState 
        // работающий только с ошибкой. В методе меняется только состояние доп функции можно осуществлять лишь в componentDidCatch 
    } */

    componentDidCatch(err, info){
        console.log(err, info);
        this.setState({error: true})
    }

    render() {
        if (this.state.error){
            return <ErrorMessage/>
        }
        return this.props.children; //дочерний компонент внутри предохранителя
    }
}

export default ErrorBoundary;