import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoKebabHorizontal } from 'react-icons/go';
import ProgressBar from './progress-bar/ProgressBar';
import { removeData } from '../store/dataSlice';
import { FaApple, FaWindows } from 'react-icons/fa';
import { IoLogoAndroid } from 'react-icons/io';
import Modal from './Modal'

const Table = (props) => {
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...props.data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleCheckboxChange = (id) => {
    setCheckedIds((prevCheckedIds) =>
      prevCheckedIds.includes(id)
        ? prevCheckedIds.filter((checkedId) => checkedId !== id)
        : [...prevCheckedIds, id]
    );
  };

  const modalAddData = () => {
    setIsModalOpen(true);
    setIsPopupVisible(false);
    };
    
  const closeModal = () => {
    setIsModalOpen(false);
    setIsPopupVisible(false);
  };

  const handleDeleteData = () => {
    dispatch(removeData(checkedIds));
    setCheckedIds([]);
    setIsPopupVisible(false);
  };

  return (
    <div className="w-full overflow-x-auto border-spacing-x-2 rounded-[25px] bg-white pb-4">
      <div className="flex justify-between px-5 py-4 mb-2">
        <h1 className="text-xl font-bold">{props.title}</h1>
        <div className="relative">
          <button onClick={togglePopup} className="bg-[#F5F7FD] rounded-lg p-1">
            <GoKebabHorizontal className="h-6 w-6 text-[#0000FF]" />
          </button>
          {isPopupVisible && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-gray-400 border-gray-200 rounded-xl shadow-lg text-xs">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={modalAddData}>
                  Add Data
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDeleteData}>
                  Delete Selected
                </li>
              </ul>
            </div>
          )}
          <Modal isOpen={isModalOpen} onClose={closeModal} type={props.type} />
        </div>
      </div>
      <div className="flex justify-end pr-5 mb-2">
      </div>
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="py-2 px-4 text-left text-gray-400 text-sm cursor-pointer" onClick={() => handleSort('name')}>
              NAME
            </th>
            <th className="py-2 px-4 text-left text-gray-400 text-sm cursor-pointer" onClick={() => handleSort('tech')}>
              TECH
            </th>
            <th className="py-2 px-4 text-left text-gray-400 text-sm cursor-pointer" onClick={() => handleSort('date')}>
              DATE
            </th>
            <th className="py-2 px-4 text-left text-gray-400 text-sm cursor-pointer" onClick={() => handleSort('progress')}>
              PROGRESS
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td className="p-3 px-4 text-sm font-bold">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 accent-[#0000FF] text-white cursor-pointer"
                    onChange={() => handleCheckboxChange(item.id)}
                    checked={checkedIds.includes(item.id)}
                  />
                  {item.name}
                </label>
              </td>
              <td className="p-3 px-4 text-sm font-bold">
                {item.tech.map((techItem, index) => (
                  <span key={index} className="mr-2">
                    {techItem === 'Mac' && <FaApple className="inline-block text-xl text-gray-500" />}
                    {techItem === 'Windows' && <FaWindows className="inline-block text-xl text-gray-500" />}
                    {techItem === 'Android' && <IoLogoAndroid className="inline-block text-xl text-gray-500" />}
                  </span>
                ))}
              </td>
              <td className="p-3 px-4 text-sm font-bold">{item.date}</td>
              <td className="flex gap-1 items-center p-3 px-4 text-sm font-bold">
                {item.progress}%
                <ProgressBar progress={item.progress} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
