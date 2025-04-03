// src/components/IndexedDBStats.jsx
import React, { useEffect, useState } from 'react';
import db from '../db';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const getIndexedDBStats = async () => {
  try {
    // Fetch current app state
    const appState = await db.appState.get('current');
    const templates = await db.templates.toArray();

    // Analyze current app state (pageStructure)
    const currentPageStructure = appState?.pageStructure || [];
    const currentTypeCounts = currentPageStructure.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    // Analyze templates
    const templateTypeCounts = templates.reduce((acc, template) => {
      const pageStructure = template.data.pageStructure || [];
      pageStructure.forEach(item => {
        acc[item.type] = (acc[item.type] || 0) + 1;
      });
      return acc;
    }, {});

    // Combine type counts (current state + all templates)
    const typeCounts = { ...currentTypeCounts };
    for (const [type, count] of Object.entries(templateTypeCounts)) {
      typeCounts[type] = (typeCounts[type] || 0) + count;
    }

    // Estimate total size in MB
    const serializeToBytes = (obj) => {
      const str = JSON.stringify(obj);
      return new TextEncoder().encode(str).length;
    };

    let totalSizeBytes = 0;
    if (appState) {
      totalSizeBytes += serializeToBytes(appState);
    }
    templates.forEach(template => {
      totalSizeBytes += serializeToBytes(template);
    });

    const totalSizeMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);

    return { typeCounts, totalSizeMB, templateCount: templates.length };
  } catch (error) {
    console.error('Error fetching IndexedDB stats:', error);
    return { typeCounts: {}, totalSizeMB: '0.00', templateCount: 0 };
  }
};

export const IndexedDBStats = () => {
  const { isLoading } = useContext(ThemeContext);
  const [stats, setStats] = useState({ typeCounts: {}, totalSizeMB: '0.00', templateCount: 0 });

  useEffect(() => {
    if (!isLoading) {
      getIndexedDBStats().then(setStats);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        getIndexedDBStats().then(setStats);
      }, 120000); // Every 2 minutes
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="indexeddb-view">
      <h3>IndexedDB Info</h3>
      <p>Total Templates: {stats.templateCount}</p>
      <ul>
        {Object.entries(stats.typeCounts).map(([type, count]) => (
          <li key={type}>
            {type} elements: {count}
          </li>
        ))}
      </ul>
      <p
        style={{
          color:
            parseFloat(stats.totalSizeMB) < 10
              ? 'green'
              : parseFloat(stats.totalSizeMB) < 50
              ? 'orange'
              : 'red',
        }}
      >
        Estimated Storage: {stats.totalSizeMB} MB
      </p>
    </div>
  );
};