import React from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import HeaderComponent from "./Header";

const { Content } = Layout;

function LayoutTemplate(props) {
	const { children } = props;

	return (
		<Layout style={{ background: "#fff" }}>
			<HeaderComponent />

			<Content>
				<div key={"child"} className="wrap-children-content">
					{children}
				</div>
			</Content>
		</Layout>
	);
}

export default withRouter(LayoutTemplate);
