import React, { Component } from 'react';
class MyComp extends Component {
    state = {
        fields: {
            name: '',
            email: ''
        },
        people: [],
        fieldErrors: {

        },
        counter: 0
    }

    isEmail = (email) => {
        return /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(.\w{2,3})+$/.test(email);
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;

        fields[evt.target.name] = evt.target.value;

        this.setState({ fields });
    }

    render() {
        return(
            <div>
                <span>{this.state.counter}</span>
                <span onClick={() => this.increaseCounter()}>Increase</span>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        placeholder="name"
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                        name="name" 
                        type="text"/>
                    <span style={{color: "red"}}>{this.state.fieldErrors.name}</span>
                    <input
                        placeholder="email"
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                        name="email" 
                        type="text"/>
                    <span style={{color: "red"}}>{this.state.fieldErrors.email}</span>
                    <button type="submit">Submit</button>
                </form>

                <ul>
                    {this.state.people.map(( { name, email }, i) => <li key={i}>{name} {email}</li>)}
                </ul>
            </div>
        )
    }
    
    validate = (person) => {
        const errors = {};

        if (!person.name) errors.name = "name required";
        if (!person.email) errors.email = "email required";
        if (person.email && !this.isEmail(person.email)) errors.email = "Invalid email";

        return errors;
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const people = [...this.state.people];

        const person = this.state.fields;

        const fieldErrors = this.validate(person);

        this.setState({fieldErrors});

        if (Object.keys(fieldErrors).length) return;

        this.setState({
            people: people.concat(person),
            fields: {
                name: '',
                email: ''
            }
        })


        // const names = [...this.state.names, this.state.name];
        
        // this.setState({
        //     names: names,
        //     name: ''
        // });

        // const people = [...this.state.people, this.state.fields]
        
        // this.setState({ fields: { name: '', email: ''},people });

        

    }
}

export default MyComp;