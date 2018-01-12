import React, { Component } from 'react';
import Field from './FieldComp';
import CourseSelect from './CourseSelect';

class MyComp extends Component {
    state = {
        fields: {
            name: '',
            email: '',
            course: null,
            department: null
        },
        people: [],
        fieldErrors: {},
        _loading: false,
        _saveStatus: 'READY'
    }

    componentWillMount() {
        this.setState({ _loading: true});
        this.apiClient.loadPeople().then((people) => {
            this.setState({
                _loading: false,
                people: people
            });
        });
    }

    isEmail = (email) => {
        return /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(.\w{2,3})+$/.test(email);
    }

    onInputChange = ({ name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors, _saveStatus: 'READY' });
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

                    {{
                        SAVING: <input value='Saving...' type='submit' disabled />,
                        SUCCESS: <input value='Saved!' type='submit' disabled />,
                        ERROR: <input
                            value='Save Failed - Retry?'
                            type='submit'
                            disabled={this.validate()}
                        />,
                        READY: <input
                            value='Submit'
                            type='submit'
                            disabled={this.validate()}
                        />
                    }[this.state._saveStatus]}

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
        const person = this.state.fields;
        
        event.preventDefault();
        
        if (this.validate()) return;

        const people = [...this.state.people, person];

        this.setState({ _saveStatus: 'SAVING'});

        this.apiClient.savePeople(people)
            .then(() => {
                this.setState({
                    people: people,
                    fields: {
                        name: '',
                        email: '',
                        course: null,
                        department: null
                    },
                    _saveStatus: 'SUCCESS'
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({ _saveStatus: 'ERROR'})
            })

    }

    
    count = 1;

    apiClient = {
        loadPeople: () => {
            return {
                then: (callback) => {
                    setTimeout(() => {
                        callback(JSON.parse(localStorage.people || '[]'));
                    }, 1000);
                }
            }
        },

        savePeople: (people) => {
            const success = true;
            // const success = !!(this.count++ % 2);
            // debugger;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // if (!success) return reject({ success });

                    localStorage.people = JSON.stringify(people);
                    return resolve({ success });
                }, 100);
            })
        }
    }
}

export default MyComp;