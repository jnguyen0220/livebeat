<script>
import ioClient from "socket.io-client";

export default {
  name: "messenger",
  props: ['send'],
  data: () => ({
    socket: null,
  }),
  methods: {
    onWelcome(data) {
      this.$emit('on-message', {type: 'welcome', message: data});
    },
    onResult(data) {
      this.$emit('on-message', {type: 'result', message: data});
    },
    onDisabled(data) {
      this.$emit('on-message', {type: 'disabled', message: data});
    },
    onAdd(data) {
      this.$emit('on-message', {type: 'add', message: data});
    },
    onRemove(data) {
      this.$emit('on-message', {type: 'remove', message: data.ids});
    },
    onConnection(data) {
      this.$emit('on-message', {type: 'connection', message: data});
    },
    onExport(data) {
      this.$emit('on-message', {type: 'export', message: data});
    }
  },
  watch: { 
    send({type, message}, oldVal) { 
      this.socket.emit(type, message);
    }
  },
  render() {
    return null;
  },
  beforeMount() {
    this.socket = ioClient(process.env.VUE_APP_SOCKET_URL);
    [
        { topic: 'welcome', func: this.onWelcome },
        { topic: 'disabled', func: this.onDisabled },
        { topic: 'result', func: this.onResult },
        { topic: 'add', func: this.onAdd },
        { topic: 'remove', func: this.onRemove },
        { topic: 'connection', func: this.onConnection },
        { topic: 'export', func: this.onExport },
        { topic: 'import', func: this.onImport },
    ].forEach(x => this.socket.on(x.topic, x.func));
  }
}
</script>