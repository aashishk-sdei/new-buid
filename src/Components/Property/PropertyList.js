import React, { useEffect, useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { UserContext } from "../../Context/UserContext";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Applogo from "../../Asset/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardLeftSidebar from "../Dashboard/DashboardLeftSidebar";
import DeleteUser from "./DeleteUserModal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
const btnStyle = {
	marginTop: "20px",
	height: "46px",
	padding: "8px",
	borderRadius: "25px",
	background: "#3765ec",
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export default function PropertyList() {
	const navigate = useNavigate();
	const [list, setList] = useState([]);
	const [item, setItem] = useState({});
	const [deleteopen, setDOpen] = useState(false);

	const handleDelClose = () => {
		setDOpen(false);
	};
	const handleClickDelOpen = (e, user) => {
		setDOpen(true);
		let i = list && list.length > 0 && list.filter(keyItem => keyItem.id == user.id)
		setItem(i && i[0])
	}

	useEffect(() => {
		const callApi = async () => {
			const response = await fetch(
				"https://ms.stagingsdei.com:4011/property/list",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const res = await response.json();
			setList(res.data.result);
		};
		callApi();

	}, []);
	const logOut = () => {
		localStorage.clear();
		navigate("/login");
	};

	const handleClickEdit = (e, row) => {
		navigate(`/edit-property/${row.id}`, { state: { rowa: row } });
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
										<StyledTableCell align="left">Property</StyledTableCell>
										<StyledTableCell align="left">Address</StyledTableCell>
										<StyledTableCell align="left">City</StyledTableCell>
										<StyledTableCell align="left">Country</StyledTableCell>
										<StyledTableCell align="left">Email</StyledTableCell>
										<StyledTableCell align="left">Status</StyledTableCell>
										<StyledTableCell align="right">Edit</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{list.map((user) => (
										<StyledTableRow key={user.userId}>
											<StyledTableCell component="th" scope="row">
												{user.propertyName}
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												{user.address1 + " " + user.address2}
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												{user.city}
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												{user.country}
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												{user.email}
											</StyledTableCell>
											<StyledTableCell component="th" scope="row">
												{user.isActive}
											</StyledTableCell>
											<StyledTableCell align="right">
												<IconButton aria-label="Edit" color="primary"
													// onClick={(user) => handleClickEdit(user)}
													onClick={(e) => handleClickEdit(e, user)}
												>
													<EditIcon />
												</IconButton>
											</StyledTableCell>

										</StyledTableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			</div>
			{/* <DeleteUser
        open={deleteopen}
        handleClose={handleDelClose}
        item={item}
      /> */}
		</>
	);
}
