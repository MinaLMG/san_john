export default function DatePicker() {
  return (
    <section class="container">
      <h3 class="pt-4 pb-2">Bootstrap Datepicker</h3>
      <form>
        <div class="row form-group">
          <label for="date" class="col-sm-1 col-form-label">
            Date
          </label>
          <div class="col-sm-4">
            <div class="input-group date" id="datepicker">
              <input type="text" class="form-control" />
              <span class="input-group-append">
                <span class="input-group-text bg-white">
                  <i class="fa fa-calendar"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
