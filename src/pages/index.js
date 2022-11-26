import React from "react";
import { Button, Space, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";

const { Title } = Typography;

function Home() {
	const history = useHistory();

	if (localStorage.getItem("x-user-id")) {
		history.push("/appointments/create");
	}
	return (
		<div
			style={{
				backgroundImage: `url(${require("../hospital.jpg")})`,
				height: "100%",
				opacity: 0.925,
			}}
		>
			<Space
				style={{
					display: "flex",
					flexDirection: "column",
					textAlign: "justify",
					maxWidth: "80%",
					paddingTop: "200px",
					paddingBottom: "200px",
					margin: "auto",
				}}
			>
				<Title>ABOUT</Title>
				<Title level={4}>
					General Hospital (often abbreviated as GH) is an American daytime
					television soap opera. It is listed in Guinness World Records as the
					longest-running American soap opera in production, and the second in
					American history after Guiding Light.[2][3] Concurrently, it is the
					world's third longest-running scripted drama series in production
					after British serials The Archers and Coronation Street, as well as
					the world's second-longest-running televised soap opera still in
					production. General Hospital premiered on the ABC television network
					on April 1, 1963. General Hospital is the longest-running serial
					produced in Hollywood, and the longest-running entertainment program
					in ABC television history. It holds the record for most Daytime Emmy
					Awards for Daytime Emmy Award for Outstanding Drama Series, with 14
					wins.
				</Title>
				<Space size={75}>
					<Button>
						<Link to={"/register"}>Sign Up</Link>
					</Button>
					<Button>
						<Link to={"/login"}>Log In</Link>
					</Button>
				</Space>
			</Space>
		</div>
	);
}

export default Home;
