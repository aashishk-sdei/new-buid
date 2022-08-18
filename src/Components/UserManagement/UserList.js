import React, { useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import { UserContext } from "../../Context/UserContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Applogo from "../../Asset/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import User from "./User";
import { useNavigate } from "react-router-dom";

import DashboardLeftSidebar from "../Dashboard/DashboardLeftSidebar"
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export default function UserList() {
	const { users, getUser } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		getUser();
	},[]);
	const logOut = () => {
		localStorage.clear();
		navigate("/login");
	};
	return (
		<>
			<div className="dashboard-wrapper d-flex flex-column flex-fill overflow-auto">
				<header className="dashboard-header d-flex align-items-center">
					<div className="left-col">
						<Avatar src={Applogo} alt="Logo" className="test" />
					</div>
					<div className="right-col ms-auto">
						<div className="user-profile-cell d-inline-flex align-items-center">
							<span>Developer_22</span>
							<IconButton
								aria-label="delete"
								color="secondary"
								onClick={logOut}
							>
								<LogoutIcon />
							</IconButton>
						</div>
					</div>
				</header>
				<div className="inner-wrapper d-flex flex-fill overflow-auto">
					<div className="left-col d-flex flex-column flex-fill overflow-auto">
						<DashboardLeftSidebar />
					</div>
					<div className="right-col d-flex flex-column flex-fill overflow-auto">
						<TableContainer component={Paper}>
							<Table aria-label="customized table">
								<TableHead>
									<TableRow sx={{ color: "red" }}>
										<StyledTableCell align="left">Username</StyledTableCell>
										<StyledTableCell align="left">Company Name</StyledTableCell>
										<StyledTableCell align="left">Email</StyledTableCell>
										<StyledTableCell align="left">First Name</StyledTableCell>
										<StyledTableCell align="left">Last Name</StyledTableCell>
										<StyledTableCell align="left">Phone</StyledTableCell>
										<StyledTableCell align="right">Edit</StyledTableCell>
										<StyledTableCell align="right">Delete</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{users.map((user) => (
										<StyledTableRow key={user.userId}>
											<StyledTableCell component="th" scope="row">
												{user.userName}
											</StyledTableCell>
											<User user={user} />
										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>

			</div>
		</>
	);
}
