import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth, googleProvider } from '../firebase';
import { LogOut, Shield, Loader2, Users, RefreshCw } from 'lucide-react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all text-sm';

// Google "G" SVG logo
function GoogleLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.4 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.4 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.7 35.7 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.2 5.2C37 39.2 44 32 44 24c0-1.3-.1-2.7-.4-3.9z" />
    </svg>
  );
}

export default function Admin() {
  // authed: false | 'hardcoded' | firebase User object
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('ngo_admin') === 'true' ? 'hardcoded' : false);
  const [googleUser, setGoogleUser] = useState(null);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const isLoggedIn = authed === 'hardcoded' || !!googleUser;

  // Persist Google auth state across refreshes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleUser(user);
      } else if (authed !== 'hardcoded') {
        setGoogleUser(null);
      }
    });
    return () => unsub();
  }, []);

  // Fetch volunteers whenever login state becomes true
  useEffect(() => {
    if (isLoggedIn) fetchVolunteers();
  }, [isLoggedIn]);

  const fetchVolunteers = async () => {
    setTableLoading(true);
    try {
      const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setVolunteers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Firestore fetch error:', err);
    } finally {
      setTableLoading(false);
    }
  };

  const handleHardcodedLogin = (e) => {
    e.preventDefault();
    if (credentials.user === ADMIN_USER && credentials.pass === ADMIN_PASS) {
      sessionStorage.setItem('ngo_admin', 'true');
      setAuthed('hardcoded');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setLoginError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setGoogleUser(result.user);
    } catch (err) {
      console.error('Google sign-in error:', err);
      setLoginError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogout = async () => {
    if (googleUser) {
      await signOut(auth);
      setGoogleUser(null);
    }
    sessionStorage.removeItem('ngo_admin');
    setAuthed(false);
    setVolunteers([]);
  };

  // ─── Login Screen ───────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Admin Login – GreenHope NGO</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-10"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#1B5E20] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-heading font-bold text-2xl text-slate-800 dark:text-white">Admin Panel</h1>
              <p className="text-slate-400 text-sm mt-1">GreenHope NGO – Restricted Access</p>
            </div>

            {/* Hardcoded Login Form */}
            <form onSubmit={handleHardcodedLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
                <input
                  type="text"
                  placeholder="admin"
                  className={inputClass}
                  value={credentials.user}
                  onChange={(e) => setCredentials((c) => ({ ...c, user: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  value={credentials.pass}
                  onChange={(e) => setCredentials((c) => ({ ...c, pass: e.target.value }))}
                />
              </div>
              {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-[#1B5E20] text-white font-heading font-bold rounded-xl hover:bg-[#145214] transition-all shadow-lg"
              >
                Login to Dashboard
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-slate-400 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Google Sign-In */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-all shadow-sm hover:shadow-md disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <GoogleLogo />
              )}
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            <p className="text-center text-xs text-slate-400 mt-6">Hardcoded demo: admin / admin123</p>
          </motion.div>
        </div>
      </>
    );
  }

  // ─── Dashboard ─────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Admin Dashboard – GreenHope NGO</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1B5E20] rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl text-slate-800 dark:text-white">Admin Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Volunteer Registrations</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchVolunteers}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

          {/* Google User Profile Card */}
          {googleUser && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm w-fit"
            >
              <img
                src={googleUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(googleUser.displayName || 'Admin')}&background=1B5E20&color=fff`}
                alt={googleUser.displayName}
                className="w-11 h-11 rounded-full border-2 border-[#1B5E20]/20"
              />
              <div>
                <p className="font-heading font-semibold text-slate-800 dark:text-white text-sm">{googleUser.displayName}</p>
                <p className="text-slate-400 text-xs">{googleUser.email}</p>
              </div>
              <span className="ml-2 px-2.5 py-0.5 bg-green-50 dark:bg-emerald-900/20 text-[#1B5E20] dark:text-emerald-400 text-xs font-medium rounded-full border border-green-100 dark:border-emerald-800/30">
                Google Auth
              </span>
            </motion.div>
          )}

          {/* Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#1B5E20] dark:text-emerald-400" />
                </div>
                <div>
                  <div className="font-heading font-bold text-2xl text-slate-800 dark:text-white">{volunteers.length}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">Total Volunteers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {tableLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#1B5E20] animate-spin" />
              </div>
            ) : volunteers.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No volunteer registrations yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                      {['#', 'Name', 'Email', 'Phone', 'City', 'Interest', 'Availability', 'Date'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((v, i) => (
                      <tr key={v.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-4 text-slate-400 dark:text-slate-500 font-mono text-xs">{i + 1}</td>
                        <td className="px-4 py-4 font-medium text-slate-800 dark:text-white whitespace-nowrap">{v.name}</td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{v.email}</td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">{v.phone}</td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">{v.city}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-green-50 dark:bg-emerald-900/20 text-[#1B5E20] dark:text-emerald-400 rounded-full text-xs font-medium whitespace-nowrap">
                            {v.interest}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400 text-xs">
                          {Array.isArray(v.availability) ? v.availability.join(', ') : v.availability || '—'}
                        </td>
                        <td className="px-4 py-4 text-slate-400 dark:text-slate-500 text-xs whitespace-nowrap">
                          {v.createdAt?.toDate ? v.createdAt.toDate().toLocaleDateString('en-IN') : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
