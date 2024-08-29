import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css'; // Ensure this file contains your CSS

const StickyTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/initialData');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  const handleDropdownChange = async (rowIndex, value) => {
    if (!value) return;

    try {
      const response = await axios.get(`http://localhost:5000/details/${value}`);
      const updatedData = [...tableData];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        column1: response.data.column1 // Only update column1
      };
      setTableData(updatedData);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="sticky-header">Dropdown</th>
            <th className="sticky-header">Column 1</th>
            <th className="sticky-header">Column 2</th>
            <th className="sticky-header">Column 3</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>
                <select
                  value={row.dropdownValue || ''}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setTableData(prevData => {
                      const updatedData = [...prevData];
                      updatedData[rowIndex] = {
                        ...updatedData[rowIndex],
                        dropdownValue: newValue
                      };
                      return updatedData;
                    });
                    handleDropdownChange(rowIndex, newValue);
                  }}
                >
                  <option value="">Select</option>
                  <option value="value1">Value 1</option>
                  <option value="value2">Value 2</option>
                </select>
              </td>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              <td>{row.column3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StickyTable;