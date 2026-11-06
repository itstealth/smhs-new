export default function EnquiryDialog() {
  return (
    <>
      <dialog
        data-enquiry-dialog
        aria-labelledby="enquiry-modal-title"
        className="m-auto w-[calc(100%-1.5rem)] max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm"
      >
        <section className="relative w-full">
          <div className="relative flex items-center justify-between border-b border-[#034ea2]/10 px-5 py-4">
            <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-[#a3123f]" />
            <div>
              <h2 id="enquiry-modal-title" className="font-serif text-lg font-bold text-[#034ea2]">
                Enquire Now
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">We&apos;ll get back to you within 24 hours</p>
            </div>
            <button
              type="button"
              data-close-enquiry
              aria-label="Close enquiry form"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f9fc] transition-colors hover:bg-[#034ea2]/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-4 py-3">
            <div className="npf_wgts w-full" data-height="400px" data-w="1044b64843af99283fc04912e7ad8bec" style={{ minHeight: 400 }} />
          </div>
        </section>
      </dialog>
      <script type="module">
        {`(function(){
          var dialog=document.querySelector('[data-enquiry-dialog]');
          if(!dialog)return;
          var widgetScript=null;
          var widget=dialog.querySelector('.npf_wgts');
          document.addEventListener('click',function(event){
            if(!(event.target instanceof Element))return;
            if(event.target.closest('[data-open-enquiry]')){
              event.preventDefault();
              if(!dialog.open){
                dialog.showModal();
                document.body.style.overflow='hidden';
                if(!widgetScript){
                  widgetScript=document.createElement('script');
                  widgetScript.type='text/javascript';
                  widgetScript.async=true;
                  widgetScript.src='https://ke9zpvp4xn.in4.widgets.nopaperforms.com/vemwgts.js';
                  document.body.appendChild(widgetScript);
                }
              }
            } else if(event.target.closest('[data-close-enquiry]')){
              dialog.close();
            } else if(event.target===dialog){
              dialog.close();
            }
          });
          dialog.addEventListener('close',function(){
            document.body.style.overflow='';
            if(widgetScript){widgetScript.remove();widgetScript=null;}
            if(widget)widget.replaceChildren();
          });
          document.addEventListener('keydown',function(event){if(event.key==='Escape'&&dialog.open)dialog.close();});
        })();`}
      </script>
    </>
  );
}
