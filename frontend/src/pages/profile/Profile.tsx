"use client";

import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useProfile } from "../../hooks/Profile/useProfile";

export default function Profile() {
  const {
    userInfo,
    profile,
    paymentData,
    loadingProfile,
    loadingPayment,
    savingProfile,
    savingPayment,
    error,
    saveProfile,
    savePaymentData,
    uploadAvatar, 
    uploadingAvatar,
  } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado local para el formulario de texto (Bio)
  const [profileForm, setProfileForm] = useState(profile);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  // Estado local para el formulario de pagos
  const [paymentForm, setPaymentForm] = useState(
    paymentData ?? {
      bankName: "",
      accountHolder: "",
      accountNumber: "",
    }
  );
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  // Sincronizar estado local cuando carga el perfil remoto
  useEffect(() => {
    setProfileForm({
      bio: profile.bio ?? "",
      avatarUrl: profile.avatarUrl ?? "",
    });
  }, [profile]);

  // Sincronizar estado local cuando cargan datos de pago
  useEffect(() => {
    setPaymentForm(
      paymentData ?? {
        bankName: "",
        accountHolder: "",
        accountNumber: "",
      }
    );
  }, [paymentData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen es muy pesada (Máximo 5MB)");
      return;
    }

    try {
      await uploadAvatar(file);
    } catch (err) {
      console.error(err);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!userInfo) {
    return (
      <DashboardLayout>
        <div className="p-8 text-white flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-cyan-400"></span>
        </div>
      </DashboardLayout>
    );
  }

  const isFreelancer = userInfo.role === "FREELANCER";

  const submitProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setProfileMessage(null);
    try {
      const payload: { bio?: string | null } = {};
      const bioTrimmed = profileForm.bio?.trim();
      
      if (bioTrimmed !== undefined) {
        payload.bio = bioTrimmed;
      }
      
      await saveProfile(payload);
      setProfileMessage("Información actualizada correctamente");
    } catch {}
  };

  const submitPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setPaymentMessage(null);
    try {
      await savePaymentData(paymentForm);
      setPaymentMessage("Datos de pago guardados");
    } catch {}
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-sm text-gray-500 mt-2">
            Gestiona tu información personal y tus datos de pago.
          </p>
        </header>

        {error && (
          <div className="alert alert-error bg-red-900/50 border-red-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <section className="bg-base-200 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center gap-6 mb-8">
            
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center overflow-hidden border-4 border-base-100 shadow-xl relative">
                {uploadingAvatar ? (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <span className="loading loading-spinner text-cyan-400"></span>
                  </div>
                ) : null}
                
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className={`w-full h-full object-cover transition-opacity ${uploadingAvatar ? 'opacity-50' : 'opacity-100'}`}
                  />
                ) : (
                  <span className="text-4xl text-white font-bold">
                    {userInfo.email.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <button
                type="button"
                disabled={uploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full text-white hover:bg-cyan-400 transition-all shadow-lg hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-20"
                title="Cambiar foto de perfil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {userInfo.email}
              </h2>
              <div className="mt-1">
                <span className="badge badge-primary badge-outline text-xs font-bold uppercase tracking-wider">
                  {userInfo.role}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={submitProfile} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sobre mí (Bio)
              </label>
              <textarea
                className="textarea textarea-bordered w-full bg-gray-900/50 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-h-[120px]"
                placeholder="Cuéntanos sobre tu experiencia, habilidades o lo que haces..."
                value={profileForm.bio ?? ""}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bio: e.target.value })
                }
                disabled={loadingProfile}
              />
              <p className="text-xs text-gray-500 mt-1">
                Esta información será visible en tu perfil público.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="btn btn-primary bg-cyan-600 hover:bg-cyan-500 border-none text-white px-6"
                disabled={savingProfile}
              >
                {savingProfile ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </button>
              {profileMessage && (
                <span className="text-sm text-green-400 font-medium animate-pulse">
                  ✓ {profileMessage}
                </span>
              )}
            </div>
          </form>
        </section>

        {isFreelancer && (
          <section className="bg-base-200 rounded-lg shadow p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <h2 className="text-xl font-bold text-white">
                Datos Bancarios
              </h2>
            </div>
            
            <form onSubmit={submitPayment} className="grid gap-6 md:grid-cols-2">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Banco
                </label>
                <input
                  type="text"
                  placeholder="Ej. BBVA, Santander..."
                  className="input input-bordered w-full bg-gray-900/50 text-white focus:ring-2 focus:ring-cyan-500"
                  value={paymentForm.bankName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, bankName: e.target.value })
                  }
                  disabled={loadingPayment}
                />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titular de la cuenta
                </label>
                <input
                  type="text"
                  placeholder="Nombre completo del titular"
                  className="input input-bordered w-full bg-gray-900/50 text-white focus:ring-2 focus:ring-cyan-500"
                  value={paymentForm.accountHolder}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      accountHolder: e.target.value,
                    })
                  }
                  disabled={loadingPayment}
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Número de cuenta / CLABE
                </label>
                <input
                  type="text"
                  placeholder="18 dígitos para CLABE o número de tarjeta"
                  className="input input-bordered w-full bg-gray-900/50 text-white focus:ring-2 focus:ring-cyan-500 font-mono tracking-wide"
                  value={paymentForm.accountNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      accountNumber: e.target.value,
                    })
                  }
                  disabled={loadingPayment}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Estos datos se compartirán con tus clientes para recibir pagos.
                </p>
              </div>

              <div className="col-span-2 flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary bg-cyan-600 hover:bg-cyan-500 border-none text-white px-6"
                  disabled={savingPayment}
                >
                  {savingPayment ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Guardando...
                    </>
                  ) : (
                    "Guardar datos bancarios"
                  )}
                </button>
                {paymentMessage && (
                  <span className="text-sm text-green-400 font-medium animate-pulse">
                    ✓ {paymentMessage}
                  </span>
                )}
              </div>
            </form>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}