import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Core from './api/core.json';
import Electives from './api/electives.json';


const Courses = {
    core: Core,
    electives: Electives,
};

class CourseSelect extends Component {
    static propTypes = {
        department: PropTypes.string,
        course: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    state = {
        department: null,
        course: null,
        courses: [],
        _loading: false
    }

    componentWillReceiveProps(update) {
        this.setState({
            department: update.department,
            course: update.course
        });
    }

    renderDepartmentSelect = () => {
        return(
            <select
                onChange={this.onSelectDepartment}
                value={this.state.department || ''}
            >
                <option value=''>
                    Which department?
                </option>
                <option value='core'>
                    NodeSchool: Core
                </option>
                <option value='electives'>
                NodeSchool: Electives
                </option>
            </select>
        )
    }

    onSelectDepartment = (evt) => {
        const department = evt.target.value;
        const course = null;

        this.setState({department, course});

        this.props.onChange({ name: 'department', value: department});
        this.props.onChange({ name: 'course', value: course});

        if (department) this.fetch(department);
    }

    fetch = (department) => {
        this.setState({ _loading: true, courses: []});
        this.apiClient(department).then((courses) => {
            this.setState({ _loading: false, courses: courses})
        });
    }

    renderCourseSelect = () => {
        if (this.state._loading) {
            return <b>LOADING...</b>
        }

        if (!this.state.department || !this.state.courses.length) return <span/>;

        return(
            <select
                onChange={this.onSelectCourse}
                value={this.state.course || ''}
            >
                {
                    [
                        <option value='' key='course-none'>
                            Which course
                        </option>,

                        ...this.state.courses.map((course, i) => (
                            <option value={course} key={i}>
                                {course}
                            </option>
                        ))
                    ]
                }
            </select>
        )
    }

    onSelectCourse = (evt) => {
        const course = evt.target.value;
        this.setState({ course });
        this.props.onChange({ name: 'course', value: course});
    }

    apiClient = (department) => {
        return {
            then: (callback) => {
                setTimeout(() => {
                    callback(Courses[department]);
                }, 1000);
            }
        }
    }

    render() {
        return(
            <div>
                { this.renderDepartmentSelect() }
                <br /><br />
                { this.renderCourseSelect() }
            </div>
        )
    }
}


export default CourseSelect;