import React, { useState } from "react";
import { connect } from "react-redux";
import * as func from "../../utility/utility";
import DatePicker from "react-datepicker";
import { formatDate } from "../../utility/utility";
import { getTasks } from "../../store/actions";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const sortOptions = [
  { label: "All", status: "" },
  { label: "A_Z", status: "a-z" },
  { label: "Z-A", status: "z-a" },
  { label: "Creation date oldest", status: "creation_date_oldest" },
  { label: "Creation date newest", status: "creation_date_newest" },
  { label: "Completion date oldest", status: "completion_date_oldest" },
];
const dateOptions = [
  { label: "Create before", status: "create_lte" },
  { label: "Create after", status: "create_gte" },
  { label: "Complete before", status: "complete_lte" },
  { label: "Complete after", status: "complete_gte" },
];
const statusOptions = [
  { label: "All", status: "" },
  { label: "Active", status: "active" },
  { label: "Done", status: "done" },
];

function Search({ getTasks, searchToggle }) {
  const [status, setStatus] = useState({
    value: "",
  });
  const [sort, setSort] = useState({
    value: "",
  });
  const [search, setSearch] = useState("");

  const [dates, setDates] = useState({
    create_lte: null,

    create_gte: null,

    complete_lte: null,

    complete_gte: null,
  });
  const handleChangeDate = (values, name) => {
    setDates({
      ...dates,
      [name]: values,
    });
  };
  const handleSubmit = () => {
    const params = {};

    search && (params.search = search);
    status.status && (params.status = status.status);
    sort.status && (params.sort = sort.status);

    for (let key in dates) {
      const value = dates[key];
      if (value) {
        const date = formatDate(value.toISOString());
        params[key] = date;
      }
    }
    getTasks(params, "GET");

    searchToggle(false);
  };
  return (
    <>
      <Modal show={true} onHide={searchToggle}>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Search Tasks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <FormControl
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Body>
          <InputGroup>
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-primary"
              title={status.status ? status.label : "Status"}
            >
              {statusOptions.map((options, index) => (
                <Dropdown.Item
                  active={status.status === options.status}
                  key={index}
                  onClick={() => setStatus(options)}
                >
                  {options.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton
              as={InputGroup.Append}
              variant="outline-primary"
              title={sort.status ? func.searchTextTruncate(sort.label) : "Sort"}
              style={{ marginLeft: "5px", marginBottom: "20px" }}
            >
              {sortOptions.map((options, index) => (
                <Dropdown.Item
                  active={status.status === options.status}
                  key={index}
                  onClick={() => setSort(options)}
                >
                  {options.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
          {dateOptions.map((options, index) => (
            <div key={index}>
              {options.label}

              <span style={{ marginLeft: "3%" }}>
                <DatePicker
                  minDate={new Date()}
                  selected={dates[options.label]}
                  onChange={(value) => handleChangeDate(value, options.label)}
                />
              </span>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="success"
          >
            Search
          </Button>
          <Button onClick={searchToggle} variant="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {};
// };

const mapDespatchToProps = {
  getTasks,
};

export default connect(null, mapDespatchToProps)(Search);
