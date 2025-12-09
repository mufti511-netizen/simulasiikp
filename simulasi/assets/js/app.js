// app.js
// Modular OOP CRUD + Tree View + Kurva S + Material Tracking + Import/Export JSON
(function () {

  // ---------- Sample data (1.1 - 7.7) ----------
  const SAMPLE_DATA = [
    {code:'1.1', group:'Pekerjaan Persiapan', name:'Mobilisasi & demobilisasi', unit:'ls', qty:1, progress:0, material:{required:1,received:0}, children:[]},
    {code:'1.2', group:'Pekerjaan Persiapan', name:'Pembersihan lahan (Land clearing)', unit:'m²', qty:360, progress:0, material:{required:360,received:0}, children:[]},
    {code:'1.3', group:'Pekerjaan Persiapan', name:'Pemindahan tanah / cut (Ekskavasi/pembuangan)', unit:'m³', qty:180, progress:0, material:{required:180,received:0}, children:[]},
    {code:'1.4', group:'Pekerjaan Persiapan', name:'Batu pecah (sub-base) 20–40 mm lapis 0.10 m', unit:'m³', qty:36, progress:0, material:{required:36,received:0}, children:[]},
    {code:'1.5', group:'Pekerjaan Persiapan', name:'Geotextile Woven/non-woven', unit:'m²', qty:360, progress:0, material:{required:360,received:0}, children:[]},
    {code:'2.1', group:'Galian & Pondasi', name:'Galian tanah pondasi', unit:'m³', qty:48.64, progress:0, material:{required:48.64,received:0}, children:[]},
    {code:'2.2', group:'Galian & Pondasi', name:'Urugan kembali (Selected material)', unit:'m³', qty:20, progress:0, material:{required:20,received:0}, children:[]},
    {code:'2.3', group:'Galian & Pondasi', name:'Beton 1:2:3 (Strip footing + footplat)', unit:'m³', qty:46.32, progress:0, material:{required:46.32,received:0}, children:[]},
    {code:'2.4', group:'Galian & Pondasi', name:'Semen Portland 50kg/sak', unit:'sak', qty:325, progress:0, material:{required:325,received:0}, children:[]},
    {code:'2.5', group:'Galian & Pondasi', name:'Pasir beton (Clean sand)', unit:'m³', qty:15.44, progress:0, material:{required:15.44,received:0}, children:[]},
    {code:'2.6', group:'Galian & Pondasi', name:'Batu pecah (Split)', unit:'m³', qty:23.16, progress:0, material:{required:23.16,received:0}, children:[]},
    {code:'2.7', group:'Galian & Pondasi', name:'Rebar pondasi (Besi tulangan pondasi)', unit:'kg', qty:4632, progress:0, material:{required:4632,received:0}, children:[]},
    {code:'3.1', group:'Struktur Beton', name:'Formwork / bekisting (Plywood 18 mm)', unit:'m²', qty:65, progress:0, material:{required:65,received:0}, children:[]},
    {code:'3.2', group:'Struktur Beton', name:'Bouplank kayu Papan penahan', unit:'m', qty:100, progress:0, material:{required:100,received:0}, children:[]},
    {code:'3.3', group:'Struktur Beton', name:'Paku konstruksi Bekisting', unit:'kg', qty:10, progress:0, material:{required:10,received:0}, children:[]},
    {code:'3.4', group:'Struktur Beton', name:'Minyak bekisting Release agent', unit:'liter', qty:10, progress:0, material:{required:10,received:0}, children:[]},
    {code:'3.5', group:'Struktur Beton', name:'Besi D10 Rebar Ø10', unit:'kg', qty:2653, progress:0, material:{required:2653,received:0}, children:[]},
    {code:'3.6', group:'Struktur Beton', name:'Besi D12 Rebar Ø12', unit:'kg', qty:2321, progress:0, material:{required:2321,received:0}, children:[]},
    {code:'3.7', group:'Struktur Beton', name:'Besi D16 Rebar Ø16', unit:'kg', qty:1658, progress:0, material:{required:1658,received:0}, children:[]},
    {code:'3.8', group:'Struktur Beton', name:'Kawat bendrat Wire tie', unit:'kg', qty:40, progress:0, material:{required:40,received:0}, children:[]},
    {code:'4.1', group:'Struktur Atap', name:'Atap galvalum Sheet galvalum', unit:'m²', qty:396, progress:0, material:{required:396,received:0}, children:[]},
    {code:'4.2', group:'Struktur Atap', name:'Reng Reng atap', unit:'m', qty:900, progress:0, material:{required:900,received:0}, children:[]},
    {code:'4.3', group:'Struktur Atap', name:'Talang & lisplank Talang', unit:'m', qty:84, progress:0, material:{required:84,received:0}, children:[]},
    {code:'5.1', group:'Arsitektur', name:'Bata / Hebel Material dinding', unit:'bh', qty:21120, progress:0, material:{required:21120,received:0}, children:[]},
    {code:'5.2', group:'Arsitektur', name:'Mortar pasangan', unit:'m³', qty:10.56, progress:0, material:{required:10.56,received:0}, children:[]},
    {code:'5.3', group:'Arsitektur', name:'Semen mortar Semen 50kg', unit:'sak', qty:61, progress:0, material:{required:61,received:0}, children:[]},
    {code:'5.4', group:'Arsitektur', name:'Pasir mortar Pasir halus', unit:'m³', qty:8.45, progress:0, material:{required:8.45,received:0}, children:[]},
    {code:'5.5', group:'Arsitektur', name:'Kusen aluminium Powder coating', unit:'set', qty:10, progress:0, material:{required:10,received:0}, children:[]},
    {code:'5.6', group:'Arsitektur', name:'Pintu panel Kayu/metal', unit:'bh', qty:10, progress:0, material:{required:10,received:0}, children:[]},
    {code:'5.7', group:'Arsitektur', name:'Jendela kaca Frame + kaca', unit:'bh', qty:15, progress:0, material:{required:15,received:0}, children:[]},
    {code:'5.8', group:'Arsitektur', name:'Plafond gypsum Gypsum board', unit:'m²', qty:360, progress:0, material:{required:360,received:0}, children:[]},
    {code:'6.1', group:'MEP', name:'Kabel NYM/NYY Instalasi listrik', unit:'m', qty:250, progress:0, material:{required:250,received:0}, children:[]},
    {code:'6.2', group:'MEP', name:'Panel + MCB Panel listrik', unit:'set', qty:1, progress:0, material:{required:1,received:0}, children:[]},
    {code:'6.3', group:'MEP', name:'Saklar Stop kontak saklar', unit:'bh', qty:30, progress:0, material:{required:30,received:0}, children:[]},
    {code:'6.4', group:'MEP', name:'Stopkontak Stop kontak', unit:'bh', qty:40, progress:0, material:{required:40,received:0}, children:[]},
    {code:'6.5', group:'MEP', name:'Lampu LED Luminaires', unit:'bh', qty:40, progress:0, material:{required:40,received:0}, children:[]},
    {code:'6.6', group:'MEP', name:'Pipa air bersih PVC', unit:'m', qty:100, progress:0, material:{required:100,received:0}, children:[]},
    {code:'6.7', group:'MEP', name:'Pipa pembuangan PVC', unit:'m', qty:80, progress:0, material:{required:80,received:0}, children:[]},
    {code:'7.1', group:'Finishing', name:'Keramik lantai 50x50', unit:'m²', qty:360, progress:0, material:{required:360,received:0}, children:[]},
    {code:'7.2', group:'Finishing', name:'Perekat keramik Adhesive', unit:'kg', qty:1440, progress:0, material:{required:1440,received:0}, children:[]},
    {code:'7.3', group:'Finishing', name:'Nat keramik Grout', unit:'kg', qty:108, progress:0, material:{required:108,received:0}, children:[]},
    {code:'7.4', group:'Finishing', name:'Cat dinding Interior', unit:'liter', qty:141, progress:0, material:{required:141,received:0}, children:[]},
    {code:'7.5', group:'Finishing', name:'Plamir Dempul', unit:'kg', qty:352, progress:0, material:{required:352,received:0}, children:[]},
    {code:'7.6', group:'Finishing', name:'Skirting Plint', unit:'m', qty:9, progress:0, material:{required:9,received:0}, children:[]},
    {code:'7.7', group:'Finishing', name:'Cat kayu / varnish Finishing kayu', unit:'liter', qty:10, progress:0, material:{required:10,received:0}, children:[]}
  ];

  // ---------- State ----------
  const STORAGE_KEY = 'progress_koperasi_v2';
  let data = [];
  let materialLog = []; // {itemCode, date, qty, note}

  // declare chart variable early so functions can reference safely
  let chart = null;

  // ---------- DOM ----------
  const DOM = {
    list: document.getElementById('list'),
    form: document.getElementById('formItem'),
    idx: document.getElementById('idx'),
    code: document.getElementById('code'),
    group: document.getElementById('group'),
    name: document.getElementById('name'),
    unit: document.getElementById('unit'),
    qty: document.getElementById('qty'),
    progress: document.getElementById('progress'),
    totalWeight: document.getElementById('totalWeight'),
    overallPercent: document.getElementById('overallPercent'),
    sCurve: document.getElementById('sCurve'),
    materialLog: document.getElementById('materialLog'),
    fileInput: document.getElementById('fileInput'),
    btnExport: document.getElementById('btnExport'),
    btnImport: document.getElementById('btnImport'),
    btnAdd: document.getElementById('btnAdd'),
    btnReset: document.getElementById('btnReset'),
    // material modal controls (assumes these exist in index.html)
    matModalEl: document.getElementById('materialModal'),
    matItemName: document.getElementById('matItemName'),
    matReceived: document.getElementById('matReceived'),
    saveMaterialBtn: document.getElementById('saveMaterial')
  };

  // ---------- Helpers ----------
  function saveAll() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, materialLog }));
  }
  function loadAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      data = parsed.data || [];
      materialLog = parsed.materialLog || [];
      return true;
    } catch (e) {
      console.warn('Failed to parse local storage', e);
      return false;
    }
  }
  function sanitizePercent(v) {
    const n = Math.max(0, Math.min(100, parseFloat(v) || 0));
    return Math.round(n * 100) / 100;
  }

  // run when DOM is ready and Chart is available
  document.addEventListener('DOMContentLoaded', () => {
    // load sample if empty (once)
    const exists = loadAll();
    if (!exists || !Array.isArray(data) || data.length === 0) {
      data = JSON.parse(JSON.stringify(SAMPLE_DATA));
      materialLog = [];
      saveAll();
    }

    // attach core listeners (some may reference DOM elements)
    if (DOM.form) {
      DOM.form.addEventListener('submit', e => {
        e.preventDefault();
        const idx = DOM.idx.value;
        const obj = {
          code: DOM.code.value.trim() || ('x' + Date.now()),
          group: DOM.group.value.trim() || 'Unspecified',
          name: DOM.name.value.trim() || 'Unnamed',
          unit: DOM.unit.value.trim() || '-',
          qty: parseFloat(DOM.qty.value) || 0,
          progress: sanitizePercent(DOM.progress.value),
          material: { required: parseFloat(DOM.qty.value) || 0, received: 0 },
          children: []
        };
        if (idx === '') {
          data.push(obj);
        } else {
          const i = parseInt(idx);
          obj.material = Object.assign({}, data[i].material || { required: obj.qty, received: 0 }, obj.material);
          obj.children = data[i].children || [];
          data[i] = obj;
        }
        saveAll();
        resetForm();
        renderAll();
      });
    }

    if (DOM.btnAdd) DOM.btnAdd.addEventListener('click', () => { resetForm(); DOM.code.focus(); });
    if (DOM.btnReset) DOM.btnReset.addEventListener('click', resetForm);

    if (DOM.btnExport) {
      DOM.btnExport.addEventListener('click', () => {
        const scope = prompt('Pilih scope export: A (pekerjaan saja), B (pekerjaan+sub-item), C (semua termasuk material). Ketik A/B/C:', 'C');
        if (!scope) return;
        const s = (scope || 'C').toUpperCase();
        if (!['A', 'B', 'C'].includes(s)) { alert('Pilihan tidak valid'); return; }
        exportJSON(s);
      });
    }

    if (DOM.btnImport && DOM.fileInput) {
      DOM.btnImport.addEventListener('click', () => DOM.fileInput.click());
      DOM.fileInput.addEventListener('change', (e) => {
        const f = e.target.files[0]; if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const j = JSON.parse(reader.result);
            if (Array.isArray(j)) {
              data = j.map(it => { it.children = it.children || []; it.material = it.material || { required: it.qty || 0, received: (it.material && it.material.received) || 0 }; return it; });
              materialLog = [];
            } else if (j && j.data) {
              data = j.data || [];
              materialLog = j.materialLog || [];
            } else {
              alert('Format JSON tidak dikenali');
              return;
            }
            saveAll();
            renderAll();
            alert('Import sukses');
          } catch (err) {
            alert('Gagal membaca file: ' + err.message);
          }
        };
        reader.readAsText(f);
      });
    }

    if (DOM.saveMaterialBtn) {
      DOM.saveMaterialBtn.addEventListener('click', () => {
        const val = parseFloat(DOM.matReceived.value) || 0;
        if (currentMaterialTargetIndex === null) return;
        applyMaterialReceive(currentMaterialTargetIndex, val);
        const mdl = (DOM.matModalEl && bootstrap.Modal.getInstance(DOM.matModalEl));
        if (mdl) mdl.hide();
      });
    }

    // initial render
    renderAll();
  });

  // ---------- Render List (grouped) ----------
  function groupBy(arr, key) {
    return arr.reduce((acc, item) => {
      (acc[item[key]] || (acc[item[key]] = [])).push(item);
      return acc;
    }, {});
  }

  function renderList() {
    if (!DOM.list) return;
    DOM.list.innerHTML = '';
    const groups = groupBy(data, 'group');
    const keys = Object.keys(groups);
    keys.forEach(g => {
      const wrapper = document.createElement('div');
      wrapper.className = 'mb-2 border rounded';
      const header = document.createElement('div');
      header.className = 'p-2 bg-white d-flex justify-content-between align-items-center group-header';
      header.innerHTML = `<div><strong>${g}</strong> <span class="small-muted">(${groups[g].length} item)</span></div><div class="small-muted">click to toggle</div>`;
      const body = document.createElement('div');
      body.className = 'p-2 bg-light';

      const table = document.createElement('table');
      table.className = 'table table-sm mb-0';
      table.innerHTML = `<thead><tr><th>Kode</th><th>Nama</th><th class="text-end">Qty</th><th class="text-center">Unit</th><th class="progress-cell">Progress</th><th>Material</th><th></th></tr></thead>`;
      const tbody = document.createElement('tbody');

      groups[g].forEach(it => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${it.code}</td>
          <td style="min-width:260px">${it.name}</td>
          <td class="text-end">${it.qty}</td>
          <td class="text-center">${it.unit}</td>
          <td class="progress-cell">
            <div class="d-flex align-items-center gap-2">
              <div style="flex:1">
                <div class="progress" style="height:12px"> <div class="progress-bar" role="progressbar" style="width:${sanitizePercent(it.progress)}%">${sanitizePercent(it.progress)}%</div></div>
              </div>
              <div style="width:68px;text-align:right">${sanitizePercent(it.progress)}%</div>
            </div>
          </td>
          <td style="min-width:140px">${(it.material && it.material.received) || 0}/${(it.material && it.material.required) || it.qty} ${it.unit}</td>
          <td class="text-end">
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-primary" data-action="edit" data-code="${it.code}">Edit</button>
              <button class="btn btn-sm btn-outline-secondary" data-action="material" data-code="${it.code}">Update Material</button>
              <button class="btn btn-sm btn-outline-danger" data-action="delete" data-code="${it.code}">Hapus</button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      body.appendChild(table);
      header.addEventListener('click', () => { body.style.display = body.style.display === 'none' ? '' : 'none'; });
      wrapper.appendChild(header);
      wrapper.appendChild(body);
      DOM.list.appendChild(wrapper);
    });

    // Attach listeners
    DOM.list.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const code = btn.dataset.code;
        const itemIndex = data.findIndex(x => x.code === code);
        if (action === 'edit') {
          populateForm(itemIndex);
        } else if (action === 'delete') {
          if (confirm('Hapus item ' + code + ' ?')) { data.splice(itemIndex, 1); saveAll(); renderAll(); }
        } else if (action === 'material') {
          openMaterialModal(itemIndex);
        }
      });
    });
  }

  // ---------- Form Helpers ----------
  function populateForm(i) {
    const it = data[i];
    if (!it) return;
    DOM.idx.value = i;
    DOM.code.value = it.code;
    DOM.group.value = it.group;
    DOM.name.value = it.name;
    DOM.unit.value = it.unit;
    DOM.qty.value = it.qty;
    DOM.progress.value = it.progress;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    if (!DOM.form) return;
    DOM.form.reset();
    DOM.idx.value = '';
    DOM.progress.value = 0;
  }

  // ---------- Summary & S-curve ----------
  function renderSummary() {
    const totalWeight = data.reduce((s, it) => s + (parseFloat(it.qty) || 0), 0);
    if (DOM.totalWeight) DOM.totalWeight.innerText = totalWeight;
    const overall = totalWeight === 0 ? 0 : data.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (sanitizePercent(it.progress) / 100), 0) / totalWeight * 100;
    if (DOM.overallPercent) DOM.overallPercent.innerText = Math.round(overall * 100) / 100 + '%';

    // S-curve cumulative percent (ordered by code)
    const ordered = data.slice().sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
    let cumWeight = 0; const labels = []; const cumPerc = [];
    ordered.forEach(it => {
      cumWeight += (parseFloat(it.qty) || 0);
      labels.push(it.code);
      const weightedDone = ordered.slice(0, ordered.indexOf(it) + 1).reduce((s, x) => s + (parseFloat(x.qty) || 0) * (sanitizePercent(x.progress) / 100), 0);
      cumPerc.push(totalWeight === 0 ? 0 : weightedDone / totalWeight * 100);
    });

    if (!DOM.sCurve) return;
    const ctx = DOM.sCurve.getContext ? DOM.sCurve.getContext('2d') : DOM.sCurve;

    if (!chart) {
      chart = new Chart(ctx, {
        type: 'line',
        data: { labels: labels, datasets: [{ label: 'Kumulatif Progres (%)', data: cumPerc, tension: 0.35, fill: true }] },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } }
      });
    } else {
      chart.data.labels = labels; chart.data.datasets[0].data = cumPerc; chart.update();
    }
  }

  // ---------- Material Tracking (UI modal) ----------
  let currentMaterialTargetIndex = null;
  function openMaterialModal(itemIndex) {
    currentMaterialTargetIndex = itemIndex;
    const it = data[itemIndex];
    if (!it) return;
    if (DOM.matItemName) DOM.matItemName.innerText = `${it.code} — ${it.name}`;
    if (DOM.matReceived) DOM.matReceived.value = 0;
    if (DOM.matModalEl && window.bootstrap) {
      const bs = new bootstrap.Modal(DOM.matModalEl);
      bs.show();
    } else {
      const received = parseFloat(prompt('Masukkan jumlah material diterima:', 0)) || 0;
      applyMaterialReceive(itemIndex, received);
    }
  }

  function applyMaterialReceive(itemIndex, numberReceived) {
    const it = data[itemIndex];
    if (!it) return;
    it.material = it.material || { required: it.qty, received: 0 };
    it.material.received = Math.max(0, (it.material.received || 0) + numberReceived);
    if (it.material.received >= (it.material.required || it.qty)) it.progress = 100;
    materialLog.push({ itemCode: it.code, date: new Date().toISOString().slice(0, 10), qty: numberReceived, note: 'Manual receive' });
    saveAll();
    renderAll();
  }

  // ---------- Render Material Log panel ----------
  function renderMaterialLog() {
    if (!DOM.materialLog) return;
    const container = DOM.materialLog;
    container.innerHTML = '';
    const small = document.createElement('div'); small.className = 'small-muted mb-2'; small.innerText = 'Log material singkat (urut berdasarkan item).';
    container.appendChild(small);
    const ul = document.createElement('ul'); ul.className = 'list-group';
    data.forEach(it => {
      const li = document.createElement('li'); li.className = 'list-group-item d-flex justify-content-between align-items-center';
      const rec = (it.material && it.material.received) || 0;
      const req = (it.material && it.material.required) || it.qty;
      li.innerHTML = `<div><strong>${it.code}</strong> ${it.name} <div class="small-muted">${rec}/${req} ${it.unit}</div></div><div class="small-muted">${sanitizePercent(it.progress)}%</div>`;
      ul.appendChild(li);
    });
    if (materialLog && materialLog.length) {
      const h = document.createElement('div'); h.className = 'mt-3 small-muted'; h.innerText = 'Recent material entries:'; container.appendChild(h);
      const ul2 = document.createElement('ul'); ul2.className = 'list-group mt-1';
      materialLog.slice(-8).reverse().forEach(m => {
        const li = document.createElement('li'); li.className = 'list-group-item';
        li.innerHTML = `<div><strong>${m.itemCode}</strong> — ${m.qty} (${m.date}) <div class="small-muted">${m.note || ''}</div></div>`;
        ul2.appendChild(li);
      });
      container.appendChild(ul2);
    }
    container.appendChild(ul);
  }

  // ---------- Import / Export JSON ----------
  function exportJSON(scope = 'C') {
    let payload;
    if (scope === 'A') {
      payload = data.map(({ code, group, name, unit, qty, progress }) => ({ code, group, name, unit, qty, progress }));
    } else if (scope === 'B') {
      payload = data.map(item => ({ code: item.code, group: item.group, name: item.name, unit: item.unit, qty: item.qty, progress: item.progress, children: item.children || [] }));
    } else {
      payload = { data, materialLog };
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `progress_export_scope_${scope}.json`; a.click();
    URL.revokeObjectURL(a.href);
  }

  // ---------- Render all ----------
  function renderAll() {
    renderList();
    renderSummary();
    renderMaterialLog();
  }

  // ---------- Misc helpers & expose ----------
  window.__pk = {
    get data() { return data; },
    get materialLog() { return materialLog; },
    exportJSON,
    resetToSample: () => { data = JSON.parse(JSON.stringify(SAMPLE_DATA)); materialLog = []; saveAll(); renderAll(); }
  };

})();
