import React, { Component } from 'react';
import './App.css';

export default class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
        this.state = {items: [], text: ''};
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>

                <form onSubmit={this.addItem}>
                    <input onChange={this.handleChange} value={this.state.text} />
                    <button>Add</button>
                </form>
                <TodoList items={this.state.items} removeItem={this.removeItem} completeItem={this.completeItem} />
            </div>
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    addItem(e) {
        e.preventDefault();
        var newItem = {
            text: this.state.text,
            id: Date.now(),
            done: false
        };
        this.setState((prevState) => ({
            items: prevState.items.concat(newItem), text : ''    }));
    }

    removeItem(id) {
        const newItems = [];
        this.state.items.forEach(item => {
            if (item.id !== id) {
                newItems.push(item);
            }
        });
        this.setState({items: newItems});
    }

    completeItem(e, id) {
        const newItems = [];
        this.state.items.forEach(item => {
            if (item.id === id) {
                if (e.target.checked) {
                    item.done = true;
                }
                else {
                    item.done = false;
                }
            }
            newItems.push(item);
        });
        this.setState({items: newItems});
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <table cellPadding={2} cellSpacing={3}>
                {this.props.items.map(item => (
                    <tr id={item.id}>
                        <td><input type="checkbox" onChange={(e) => this.props.completeItem(e, item.id)}/> </td>
                        <td className={item.done === true ? 'todo-done'  : 'todo'}>{item.text}</td>
                        <td><input type="button" value="Delete" onClick={() => this.props.removeItem(item.id)} /> </td>
                    </tr>
                ))}
            </table>
        );
    }
}
