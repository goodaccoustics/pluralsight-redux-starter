import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import  * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
		//this.state = {
		//	course: {title: ""}
		//};

		//bind statements to bind the this keyword to this context
		//this.onTitleChange = this.onTitleChange.bind(this);
		//this.onClickSave = this.onClickSave.bind(this);
	}

	//onTitleChange(event) {
	//	const course = this.state.course;
	//	course.title = event.target.value;
	//	this.setState({course: course});
	//}

	//onClickSave() {
		//alert(`Saving ${this.state.course.title}`);
		//this.props.dispatch(courseActions.createCourse(this.state.course));
	//	this.props.actions.createCourse(this.state.course);
	//}

	courseRow(course, index) {
		return (
			<div key={index}>{course.title}</div>
		);
	}

	redirectToAddCoursePage() {
		browserHistory.push('/course');
	}

	render() {
		const {courses} = this.props;
		return (
			<div>
				<h1>Courses</h1>
				<input 
					type="submit"
					value="Add Course"
					className="btn btn-primary"
					onClick={this.redirectToAddCoursePage}
				/>
				<CourseList courses={courses} />
			</div>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

// mapStateToProps determines what props are available in this component
function mapStateToProps(state, ownProps) {
	return {
		courses: state.courses
	};
}

// mapDispatchToProps determines what actions are available in this component
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

// alternative to export default
//const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
//export default connectedStateAndProps(CoursesPage);

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
