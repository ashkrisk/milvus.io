document.addEventListener('DOMContentLoaded', () => {
    // index comparison table
    const trs = document.querySelectorAll('tr');
    [].forEach.call(trs, tr => tr.addEventListener('click', () => {
        const content = tr.nextSibling;
        if(content.className) content.style.display = content.style.display == 'none' ? 'table-row' : 'none';
    }))

    // multiple language
    // const headerNavCon = document.querySelector('.nav-site');
    // const languageMenu = document.querySelector('.nav-site>span');
    // languageMenu.style.display = 'none';
    // const languageMap = {
    //     'en': 'English',
    //     'zh-CN': '简体中文'
    // };
    // Object.keys(languageMap).forEach(l => {
    //     const li = document.createElement('li');
    //     let href = window.location.pathname.replace(/en|zh-CN/, l);

    //     li.innerHTML = `<a href="${href}" target="_self" data-v="${l}">${languageMap[l]}</a>`;
    //     headerNavCon.appendChild(li);
    // });

    // download pdf 
    const nav = document.querySelector('.toc');
    if (!nav) return;
    
    // add Download PDF button
    const createDownloadPdfElement = node => {
        const parent = node.parentNode;
        const arr = window.location.href.split('/');
        const len = arr.length;
        const targetName = arr[len-1] === '' ? arr[len-2] : arr[len-1];
        const targetLink = `${window.location.origin}/${targetName}.md.pdf`
        
        const downloadlink = document.createElement('div');
        downloadlink.innerHTML = `
            <a class="edit-page-link button" style="margin-left:10px !important;" target="_blank" href= ${targetLink} >
            <i class="fas fa-file-pdf"></i>
                &nbsp;Download PDF 
            </a>`;
        parent.insertBefore(downloadlink, node)
        return false;
    }
    // add Download PDF button
    const editButtonEle = document.querySelector('.edit-page-link');
    if(editButtonEle) {
        createDownloadPdfElement(editButtonEle);
        const span = document.createElement('span');
        span.innerHTML=`<i class="far fa-edit"></i> &nbsp;`
        editButtonEle.insertBefore(span, editButtonEle.lastChild)
    }

});