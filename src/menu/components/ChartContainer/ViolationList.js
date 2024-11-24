import React, { useState, useEffect } from 'react';
import ViolationItem from './ViolationItem';
import { parseHelmetData, parseLaneViolationData, parseReverseDrivingData, parseCenterLineViolationData } from '../../utils';
import './ViolationList.css';

const ViolationList = () => {
  const [helmetData, setHelmetData] = useState([]);
  const [laneData, setLaneData] = useState([]);
  const [reverseDrivingData, setReverseDrivingData] = useState([]);
  const [centerLineData, setCenterLineData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/cctv_violation_data_20231115_to_20251115_dataset_1.csv');
        const csvText = await response.text();
        
        // 각 위반 유형별 데이터 파싱
        const helmetViolations = parseHelmetData(csvText);
        const laneViolations = parseLaneViolationData(csvText);
        const reverseDrivingViolations = parseReverseDrivingData(csvText);
        const centerLineViolations = parseCenterLineViolationData(csvText);

        setHelmetData(helmetViolations);
        setLaneData(laneViolations);
        setReverseDrivingData(reverseDrivingViolations);
        setCenterLineData(centerLineViolations);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const violationItems = [
    { title: "헬멧 미착용 그래프", data: helmetData },
    { title: "1차선 주행 그래프", data: laneData },
    { title: "역주행 그래프", data: reverseDrivingData },
    { title: "중앙선 침범 그래프", data: centerLineData }
  ];

  return (
    <div className="violation-list" style={{ height: '250px', overflowY: 'auto', backgroundColor: 'transparent' }}>
      <ul>
        {expandedIndex === null ? (
          violationItems.map((item, index) => (
            <ViolationItem
              key={index}
              title={item.title}
              data={item.data}
              isExpanded={false}
              onToggle={() => toggleExpand(index)}
            />
          ))
        ) : (
          <ViolationItem
            title={violationItems[expandedIndex].title}
            data={violationItems[expandedIndex].data}
            isExpanded={true}
            onToggle={() => toggleExpand(expandedIndex)}
          />
        )}
      </ul>
    </div>
  );
};

export default ViolationList;