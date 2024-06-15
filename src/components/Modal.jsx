import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { addData } from '../store/dataSlice';

const Modal = ({ isOpen, onClose, type }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [tech, setTech] = useState([]);

  const handleTechChange = (event) => {
    const techValue = event.target.value;
    if (event.target.checked) {
      setTech([...tech, techValue]);
    } else {
      setTech(tech.filter(item => item !== techValue));
    }
  };

  const handleSubmit = () => {
    const newData = {
      id: uuidv4(),
      name: name,
      tech: tech,
      dev: type,
      date: selectedDate.toISOString().split('T')[0],
      progress: 0,
    };
    dispatch(addData(newData));
    onClose();
    setName('');
    setSelectedDate(null);
    setTech([]);
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-20">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">Tech</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      value="Mac"
                      onChange={handleTechChange}
                      checked={tech.includes('Mac')}
                    />
                    <span className="ml-2">Mac</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      value="Windows"
                      onChange={handleTechChange}
                      checked={tech.includes('Windows')}
                    />
                    <span className="ml-2">Windows</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      value="Android"
                      onChange={handleTechChange}
                      checked={tech.includes('Android')}
                    />
                    <span className="ml-2">Android</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#0000FF] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
