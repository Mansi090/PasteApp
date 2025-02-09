import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
// import { fetchPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const ViewPaste = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const [isLoading, setIsLoading] = useState(true);
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    const loadPaste = async () => {
      setIsLoading(true);
      try {
        if (allPastes.length === 0) {
          await dispatch(fetchPastes()).unwrap();
        }
        const updatedPastes = [...allPastes, ...(await dispatch(fetchPastes()).unwrap())];
        const foundPaste = updatedPastes.find(p => p._id === id);
        setPaste(foundPaste);
      } catch (error) {
        toast.error('Failed to load paste');
      } finally {
        setIsLoading(false);
      }
    };

    loadPaste();
  }, [dispatch, id]);

  const handleCopy = () => {
    if (paste) {
      navigator.clipboard.writeText(paste.content)
        .then(() => toast.success('Copied to clipboard!'))
        .catch(() => toast.error('Failed to copy'));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <ClipLoader color="#4F46E5" size={50} />
      </div>
    );
  }

  if (!paste) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Paste Not Found</h1>
          <p className="text-gray-600 mb-6">
            The paste you're looking for doesn't exist or might have been deleted.
          </p>
          <NavLink
            to="/pastes"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Pastes
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{paste.title}</h1>
              <p className="text-gray-500 text-sm mt-2">
                Created at: {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-copy"></i>
              Copy
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 font-mono whitespace-pre-wrap">
            {paste.content}
          </div>

          <div className="mt-8">
            <NavLink
              to="/pastes"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to All Pastes
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
