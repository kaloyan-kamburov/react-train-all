import React, { Component } from 'react';
import Field from './FieldComp';
import CourseSelect from './CourseSelect';

class MyComp extends Component {
    state = {
        fields: {
            name: '',
            email: ''
        },
        people: [],
        fieldErrors: {

        }
    }

    isEmail = (email) => {
        return /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(.\w{2,3})+$/.test(email);
    }

    onInputChange = ({ name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <Field
                        placeholder='name'
                        name='name'
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                        validate={(val) => (val ? false : 'Name Requred')}
                    />
                    <br />
                    <Field
                        placeholder='email'
                        name='email'
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                        validate={(val) => (this.isEmail(val) ? false : 'Invalid Email')}
                    />
                    <br />
                    <CourseSelect
                        department={this.state.fields.department}
                        course={this.state.fields.course}
                        onChange={this.onInputChange}
                    />
                    <br />
                    <button type="submit" disabled={this.validate()}>Submit</button>
                </form>

                <ul>
                    {this.state.people.map(( { name, email, department, course }, i) => <li key={i}>{name} {email} {department} {course}</li>)}
                </ul>
            </div>
        )
    }
    
    validate = () => {
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])

        if (!person.name) return true;
        if (!person.email) return true;
        if (!person.course) return true;
        if (!person.department) return true;
        if (errMessages.length) return true;
        
        return false;
    }

    onFormSubmit = (event) => {

        const people = this.state.people;
        const person = this.state.fields;

        event.preventDefault();

        if (this.validate()) return;

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