import React, { useRef, useState } from 'react';
import { Instagram, Download, UploadCloud, ShieldCheck, Image, Video, X, ExternalLink } from 'lucide-react';

const exampleUrl = 'https://www.instagram.com/stories/rizq.aml/4024492924410663533';

export default function App() {
  const [url, setUrl] = useState(exampleUrl);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function chooseFile(e) {
    const selected = e.target.files?.[0];
    setError('');
    if (!selected) return;
    if (!selected.type.startsWith('image/') && !selected.type.startsWith('video/')) {
      setError('Pilih file foto atau video yang valid.');
      return;
    }
    if (selected.size > 250 * 1024 * 1024) {
      setError('Ukuran file maksimal 250 MB.');
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function saveFile() {
    if (!file || !preview) return;
    const a = document.createElement('a');
    a.href = preview;
    a.download = file.name || 'instagram-story';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function clearFile() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview('');
    if (inputRef.current) inputRef.current.value = '';
  }

  function openInstagram() {
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="page">
      <nav className="nav">
        <div className="brand"><span className="brand-icon"><Instagram size={21}/></span><span>Story<span className="accent">Saver</span></span></div>
        <span className="safe"><ShieldCheck size={15}/> Simpan dengan izin</span>
      </nav>

      <section className="hero">
        <div className="eyebrow">INSTAGRAM MEDIA SAVER</div>
        <h1>Simpan momen,<br/><span>tanpa ribet.</span></h1>
        <p className="intro">Simpan foto atau video Story yang kamu miliki atau yang pemiliknya sudah mengizinkan untuk dibagikan.</p>

        <div className="panel">
          <label className="label" htmlFor="story-url">Tautan Story (opsional, sebagai catatan)</label>
          <div className="url-row">
            <input id="story-url" value={url} onChange={e => setUrl(e.target.value)} placeholder="Tempel tautan Instagram Story di sini"/>
            <button className="open-btn" onClick={openInstagram} title="Buka Instagram"><ExternalLink size={17}/></button>
          </div>
          <p className="hint">Tautan private tidak bisa diambil langsung oleh halaman ini. Minta pemilik mengirim media atau gunakan fitur unduh resmi Instagram jika tersedia.</p>

          <div className="separator"><span>LANGKAH BERIKUTNYA</span></div>

          <input ref={inputRef} type="file" accept="image/*,video/*" onChange={chooseFile} hidden/>
          {!file ? (
            <button className="upload" onClick={() => inputRef.current?.click()}>
              <span className="upload-icon"><UploadCloud size={23}/></span>
              <strong>Pilih foto atau video</strong>
              <span>Ketuk untuk memilih file dari perangkat</span>
              <small>JPG, PNG, WEBP, MP4, MOV • Maks. 250 MB</small>
            </button>
          ) : (
            <div className="preview-card">
              {file.type.startsWith('video/') ? <video src={preview} controls /> : <img src={preview} alt="Pratinjau media yang dipilih"/>}
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB · {file.type.startsWith('video/') ? 'Video' : 'Foto'}</div>
              </div>
              <button className="icon-btn" onClick={clearFile} aria-label="Hapus file"><X size={18}/></button>
              <button className="download-btn" onClick={saveFile}><Download size={18}/> Simpan ke perangkat</button>
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </div>

        <div className="notice"><ShieldCheck size={18}/><p><strong>Privasi:</strong> File diproses langsung di browser perangkatmu. Aplikasi ini tidak mengirim file ke server dan tidak meminta password Instagram.</p></div>
      </section>

      <section className="steps">
        <h2>Cara menggunakan</h2>
        <div className="step-grid">
          <article><div className="step-number">01</div><h3>Dapatkan media</h3><p>Minta pemilik akun mengirim foto/video Story atau gunakan opsi unduh resmi yang tersedia.</p></article>
          <article><div className="step-number">02</div><h3>Pilih file</h3><p>Unggah file foto atau video dari galeri perangkat ke halaman ini.</p></article>
          <article><div className="step-number">03</div><h3>Simpan</h3><p>Periksa pratinjau, lalu tekan tombol simpan ke perangkat.</p></article>
        </div>
      </section>
      <footer>StorySaver · Gunakan hanya untuk konten yang kamu miliki atau diizinkan pemiliknya.</footer>
    </main>
  );
}
